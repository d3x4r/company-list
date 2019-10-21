<template>
  <div class="modal" @submit.prevent="onSubmit" :class="{ 'd-block': formState === 'visible' }">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Данные компании</h5>
          <button type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeForm"
            >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form class="modal-body">
          <div class="form-group">
            <label for="name">Наименование:</label>
            <input
              class="form-control"
              type="text"
              id="name"
              placeholder="Наименование"
              v-model="form.name"
              v-on:input="$v.form.name.$touch"
              :class="{'is-invalid': $v.form.name.$error}"
            />

            <div class="invalid-feedback">Поле обязательно к заполнению</div>
          </div>
          <div class="form-group">
            <label for="adress">Адрес:</label>
            <input
              class="form-control"
              type="text"
              id="adress"
              placeholder="Адрес"
              v-model="form.adress"
            />
          </div>
          <div class="form-group">
            <label for="ogrn">ОГРН:</label>
            <input
              class="form-control"
              type="text"
              id="ogrn"
              placeholder="ОГРН"
              v-model="form.ogrn"
              v-on:input="$v.form.ogrn.$touch"
              :class="{'is-invalid': $v.form.ogrn.$error}"
            />
            <div class="invalid-feedback">
              Государственный регистрационный номер записи является последовательностью из 13 цифр
            </div>
          </div>
          <div class="form-group">
            <label for="inn">ИНН:</label>
            <input
              class="form-control"
              type="text"
              id="inn"
              placeholder="ИНН"
              v-model="form.inn"
              v-on:input="$v.form.inn.$touch"
              :class="{'is-invalid': $v.form.inn.$error}"
            />
            <div class="invalid-feedback" v-if="!$v.form.inn.required">
              Поле обязательно к заполнению
            </div>
            <div
              class="invalid-feedback"
              v-else-if="!$v.form.inn.isInn || !$v.form.inn.integer"
            >ИНН российского юридического лица является последовательностью из 10 цифр</div>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <button class="btn btn-success btn-sm mt-1"
                @click="updateForm(form.inn)"
                type="button"
                :disabled="form.loading === true"
                >
                <span class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="form.loading === true"
                  ></span>
                <span v-if="form.loading === true"> Загрузка...</span>
                <span v-else-if="form.loading === 'error'"
                  class="text-danger">Ошибка</span>
                <span v-else>Заполнить форму</span>
              </button>
              <button
                @click="form.inn='7728240240'"
                type="button"
                class="btn btn-info btn-sm mt-1"
                >Пример
              </button>
            </div>
          </div>
          <div class="form-group">
            <label for="date">Дата регистрации:</label>
            <input
              class="form-control"
              type="text"
              id="date"
              placeholder="Дата регистрации"
              v-model="form.date"
            />
            <div class="invalid-feedback">Please choose a username.</div>
          </div>
          <button type="submit"
            class="btn btn-primary"
            :disabled="$v.$invalid"
          >
            Отправить
          </button>
          <button type="button"
            class="btn btn-secondary ml-3"
            data-dismiss="modal"
            @click="formReset"
          >
            Очистить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { uniqueId } from 'lodash';
import { required, integer } from 'vuelidate/lib/validators';
import getCompany from '../getCompany';

const INN_LENGTH = 10;
const OGRN_LENGTH = 13;

export default {
  name: 'Form',
  props: {
    formState: String,
  },
  data() {
    return {
      form: {
        name: '',
        inn: '',
        ogrn: '',
        date: '',
        adress: '',
        id: '',
        isEditing: false,
        loading: false,
      },
    };
  },
  methods: {
    formReset() {
      this.form.name = '';
      this.form.inn = '';
      this.form.ogrn = '';
      this.form.date = '';
      this.form.adress = '';
      this.form.id = '';

      this.$nextTick(() => this.$v.$reset());
    },
    onSubmit() {
      this.setCompanyId();
      this.$emit('addCompany', this.form);
      this.formReset();
      this.$emit('formChangeState');
    },
    setCompanyId() {
      this.form.id = uniqueId();
    },
    closeForm() {
      this.$emit('formChangeState');
    },
    async updateForm(currentInn = '7728240240') {
      try {
        this.form.loading = true;
        const company = await getCompany(currentInn);

        const {
          inn,
          adress,
          ogrn,
          name,
          date,
        } = company;

        this.form.inn = inn;
        this.form.name = name;
        this.form.ogrn = ogrn;
        this.form.date = date;
        this.form.adress = adress;

        this.form.loading = false;
      } catch (error) {
        this.form.loading = 'error';
      }
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
      inn: {
        required,
        isInn: value => value.length === INN_LENGTH,
        integer,
      },
      ogrn: {
        integer,
        isOgrn: value => value.length === OGRN_LENGTH,
      },
    },
  },
};
</script>
