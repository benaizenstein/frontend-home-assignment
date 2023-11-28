<template>
  <div>
    <v-container
      :class="!dataExists ? 'onLoad centerContent' : 'centerContent'"
    >
      <v-row>
        <v-col>
          <h6>Ben Aizenstein</h6>
          <h1>Frontend Home Assignment</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="fetchUsers">Fetch</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-row v-if="dataExists">
      <v-col cols="2" class="ml-6">
        <v-text-field
          v-model="nameFilter"
          label="Filter by Name"
          variant="solo"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="ml-6">
        <v-text-field
          v-model="countryFilter"
          label="Filter by Country"
          variant="solo"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-data-table
      v-if="dataExists"
      :headers="headers"
      :items="filteredPeople"
      :item-key="(item) => item.login.uuid"
      :items-per-page="10"
      :items-per-page-options="[1, 2, 5, 10]"
      @click:row="showDetails"
    >
      <template v-slot:[`item.thumbnail`]="{ item }">
        <v-img
          v-if="item.picture"
          :src="item.picture.thumbnail || item.picture.large"
          width="50"
          height="50"
        ></v-img>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        {{ item.name?.title }} {{ item.name?.first }}
        {{ item.name?.last }}
      </template>
      <template v-slot:[`item.gender`]="{ item }">
        {{ item.gender || "" }}
      </template>
      <template v-slot:[`item.country`]="{ item }">
        {{ item.location?.country || "" }}
      </template>
      <template v-slot:[`item.phone`]="{ item }">
        {{ item.phone || "" }}
      </template>
      <template v-slot:[`item.email`]="{ item }">
        {{ item.email || "" }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const nameFilter = ref("");
    const countryFilter = ref("");

    const fetchedPeople = computed(() => store.getters["fetchedPeople"]);
    const people = computed(() => store.state.peopleModule.people);

    const dataExists = computed(() => {
      const fetched = fetchedPeople.value || people.value || [];
      return fetched.length > 0;
    });
    const headers = [
      { title: "Picture", key: "thumbnail", sortable: false },
      { title: "Name", key: "name", sortable: false },
      { title: "Gender", key: "gender", sortable: false },
      { title: "Country", key: "country", sortable: false },
      { title: "Phone Number", key: "phone", sortable: false },
      { title: "Email", key: "email", sortable: false },
    ];

    const fetchUsers = () => {
      store.dispatch("fetchPeople");
    };

    const showDetails = (event, data) => {
      const person = data.item;
      store.dispatch("selectPerson", person);
      router.push({
        name: "PersonDetails",
        params: { personId: person.login?.uuid },
      });
    };

    const filterByName = (item) => {
      return (
        (item.name &&
          item.name.first
            .toLowerCase()
            .includes(nameFilter.value.toLowerCase())) ||
        item.name.last.toLowerCase().includes(nameFilter.value.toLowerCase())
      );
    };

    const filterByCountry = (item) => {
      return (
        item.location &&
        item.location.country
          .toLowerCase()
          .includes(countryFilter.value.toLowerCase())
      );
    };

    const filteredPeople = computed(() => {
      const filtered = fetchedPeople.value || people.value || [];
      return filtered.filter((item) => {
        const nameMatch = filterByName(item);
        const countryMatch = filterByCountry(item);
        return nameMatch && countryMatch;
      });
    });

    return {
      nameFilter,
      countryFilter,
      headers,
      dataExists,
      filteredPeople,
      fetchUsers,
      showDetails,
    };
  },
};
</script>
<style>
.centerContent {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
  margin-bottom: 2vh;
  flex-direction: column;
  transition: margin-top 0.5s, margin-bottom 0.5s;
}
.onLoad {
  margin-top: 20vh;
}
</style>