<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Наименование</th>
        <th scope="col">ИНН</th>
        <th scope="col">ОГРН</th>
        <th scope="col">Адрес</th>
        <th scope="col">Дата регистрации</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(company, index) in companysForRender"
        :key="company.id">
        <th class="align-middle" scope="row">{{ index + 1}}</th>
        <td class="align-middle">{{ company.name }}</td>
        <td class="align-middle">{{ company.inn }}</td>
        <td class="align-middle">{{ company.ogrn }}</td>
        <td class="align-middle">
          <div style="min-height: 38px"
          class="align-middle"
          v-if="!company.isEditing"
          @click="editAdress(company.id)"
          >
            {{ company.adress }}
          </div>
          <input type="text"
            :value="company.adress"
            v-if="company.isEditing"
            @blur="saveAddress(company.id, $event)"
            >
        </td>
        <td class="align-middle">{{ company.date }}</td>
        <td class="align-middle">
          <button type="button"
            class="close"
            aria-label="Close"
            @click="removeCompany(company.id)"
            >
            <span aria-hidden="true">&times;</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: ['companys'],
  data() {
    return {
      formState: 'hidden',
      companysForRender: this.companys,
    };
  },
  watch: {
    companys(updatedCompanys) {
      this.companysForRender = updatedCompanys;
    },
  },
  methods: {
    removeCompany(id) {
      this.$emit('deleteCompany', id);
    },
    editAdress(id) {
      this.$emit('changeEditingState', id);
    },
    saveAddress(id, evt) {
      this.$emit('changeEditingState', id);
      this.$emit('updateAddress', id, evt.target.value);
    },
  },
};
</script>
