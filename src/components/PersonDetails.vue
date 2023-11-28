<template>
  <div class="centerContent">
    <v-card v-if="selectedPerson" class="custom-card" variant="outlined">
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-img
              v-if="selectedPerson.picture.large"
              :src="selectedPerson.picture.large"
              width="400"
              height="400"
            ></v-img>
          </v-col>
          <v-col cols="8">
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="gender"
                  label="Gender"
                  :value="gender"
                  readonly
                  variant="solo"
                ></v-text-field>
                <v-text-field
                  v-model="editedName"
                  label="Name"
                  style="color: rgb(24, 130, 230)"
                ></v-text-field>
                <v-text-field
                  v-model="ageAndYearOfBirth"
                  label="Age + Year of Birth"
                  :value="ageAndYearOfBirth"
                  readonly
                  variant="solo"
                ></v-text-field>
                <v-text-field
                  v-model="address"
                  label="Address"
                  :value="address"
                  readonly
                  variant="solo"
                ></v-text-field>
                <v-text-field
                  v-model="contact"
                  label="Contact"
                  :value="contact"
                  readonly
                  variant="solo"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="saveChanges" color="primary">Save</v-btn>
              <v-btn @click="goBack">Back</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const editedName = ref("");
    const ageAndYearOfBirth = ref("");
    const gender = ref("");
    const address = ref("");
    const contact = ref("");

    const selectedPerson = computed(() => store.getters.getSelectedPerson);

    const initializeFields = () => {
      const person = selectedPerson.value;
      if (!person) {
        router.push("/");
        return;
      }

      editedName.value = getFormattedName(person.name);
      ageAndYearOfBirth.value = getAgeAndYearOfBirth(person.dob);
      address.value = getAddress(person.location);
      contact.value = getContact(person);
      gender.value = person.gender || "";
    };

    const getFormattedName = (name) => {
      if (!name) return "";
      return `${name.first || ""} ${name.last || ""}`;
    };

    const getAgeAndYearOfBirth = (dob) => {
      if (!dob || !dob.date) return "";
      const dateOfBirth = new Date(dob.date);

      const day = dateOfBirth.getDate();
      const month = dateOfBirth.getMonth() + 1;
      const year = dateOfBirth.getFullYear();

      const formattedDate = `${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")}/${year}`;

      return `${dob.age || ""} - ${formattedDate}`;
    };

    const getAddress = (location) => {
      if (!location) return "";
      return `${location.street?.number || ""} ${
        location.street?.name || ""
      }, ${location.city || ""}, ${location.state || ""}`;
    };

    const getContact = (person) => {
      if (!person) return "";
      return `Email: ${person.email || ""}, Phone: ${person.phone || ""}`;
    };

    onMounted(() => {
      initializeFields();
    });

    const saveChanges = () => {
      const person = selectedPerson.value;
      if (!person) return;

      store.dispatch("saveEditedPersonDetails", {
        id: person.login.uuid,
        newName: editedName.value,
      });

      router.go(-1);
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      selectedPerson,
      saveChanges,
      goBack,
      gender,
      editedName,
      ageAndYearOfBirth,
      address,
      contact,
    };
  },
};
</script>
<style>
.custom-card {
  margin-top: 15vh;
  width: 60vw;
}
.centerContent {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
