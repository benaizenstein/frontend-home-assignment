import { createStore } from 'vuex';
import axios from 'axios';

interface Person {
  dob: { age: number };
  location: { street: { number: number; name: string }; city: string; state: string };
  email: string;
  phone: string;
}

interface TransformedPerson extends Person {
  login: { uuid: string };
  name: { first: string; last: string; title: string };
  age: number;
  address: { street: string; city: string; state: string };
  contact: { email: string; phone: string };
}

interface PeopleState {
  people: TransformedPerson[];
  selectedPerson: TransformedPerson | null;
}

export default createStore({
  state: {
    peopleModule: {
      people: [],
      selectedPerson: null,
    } as PeopleState,
  },
  getters: {
    fetchedPeople: (state: { peopleModule: PeopleState }) => state.peopleModule.people,
    getSelectedPerson: (state: { peopleModule: PeopleState }) => state.peopleModule.selectedPerson,
  },


  mutations: {
    SET_PEOPLE(state: { peopleModule: PeopleState }, people: Person[]) {
      state.peopleModule.people = people.map(person => ({
        ...person,
        age: person.dob.age,
        address: {
          street: `${person.location.street.number} ${person.location.street.name}`,
          city: person.location.city,
          state: person.location.state,
        },
        contact: {
          email: person.email,
          phone: person.phone,
        },
      })) as TransformedPerson[];
    },
    SET_SELECTED_PERSON(state: { peopleModule: PeopleState }, person: Person) {

      state.peopleModule.selectedPerson = {
        ...person,
        age: person.dob.age,
        address: {
          street: `${person.location.street.number} ${person.location.street.name}`,
          city: person.location.city,
          state: person.location.state,
        },
        contact: {
          email: person.email,
          phone: person.phone,
        },
      } as TransformedPerson;
    },
    SET_SELECTED_PERSON_NAME(
      state: { peopleModule: PeopleState },
      { id, newName }: { id: string; newName: string }
    ) {
      const selectedPerson = state.peopleModule.selectedPerson;
      if (selectedPerson) {
        const foundPersonIndex = state.peopleModule.people.findIndex(person => person.login.uuid === id);
        if (foundPersonIndex !== -1) {
          const foundPerson = state.peopleModule.people[foundPersonIndex];
          if (foundPerson) {
            foundPerson.name.first = newName;
            foundPerson.name.last = '';
            foundPerson.name.title = '';
          }
        }
      }
    },
  },
  actions: {
    async fetchPeople({ commit }) {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=10');
        const data = response.data.results;
        commit('SET_PEOPLE', data);
      } catch (error) {
        console.error('Error fetching people:', error);
        // Potentially handle error or dispatch another action for retry
      }
    },
    selectPerson({ commit }, person: Person) {
      commit('SET_SELECTED_PERSON', person);
    },
    saveEditedPersonDetails({ commit }, editedName: { id: string; newName: string }) {
      commit('SET_SELECTED_PERSON_NAME', editedName);
    },
  },
});
