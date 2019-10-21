<template>
  <div class="container" id="app">
    <div class="app-header pt-2 pb-2">
      <button class="btn btn-primary ml-auto d-block"
      type="button"
      @click="formChangeState">Добавить компанию</button>
    </div>
    <div>
      <p class="bg-warning text-right"
        v-if="companys.length === 0">
        Список компаний пуст. Нажмите на кнопку выше.
      </p>
      <Table v-else :companys="companys"
        @deleteCompany="deleteCompany"
        @changeEditingState="changeEditingState"
        @updateAddress="updateAddress"
         />
    </div>
    <Form @addCompany="addCompany" @formChangeState="formChangeState" :formState="formState" />
  </div>
</template>

<script>
import Form from './components/Form.vue';
import Table from './components/Table.vue';

export default {
  name: 'app',
  components: {
    Form,
    Table,
  },
  data() {
    return {
      formState: 'hidden',
      companys: [],
    };
  },
  methods: {
    addCompany(newCompany) {
      this.companys = [...this.companys, { ...newCompany }];
    },
    formChangeState() {
      this.formState = this.formState === 'hidden' ? 'visible' : 'hidden';
    },
    deleteCompany(id) {
      this.companys = this.companys.filter(company => company.id !== id);
    },
    changeEditingState(id) {
      this.companys = this.companys.map((company) => {
        if (company.id === id) {
          return { ...company, isEditing: !company.isEditing };
        }
        return company;
      });
    },
    updateAddress(id, adress) {
      this.companys = this.companys.map((company) => {
        if (company.id === id) {
          return { ...company, adress };
        }
        return company;
      });
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
