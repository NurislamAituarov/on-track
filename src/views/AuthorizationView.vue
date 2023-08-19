<template>
  <form
    @submit.prevent="submit"
    class="text-start px-5 py-20 flex flex-col gap-5 max-w-2xl mx-auto my-0"
  >
    <h1>Auth</h1>

    <pre>{{ form }}</pre>

    <div class="form__control">
      <label for="email" class="mb-10">Email</label>
      <input
        v-model="form.email.value"
        @blur="form.email.blur"
        type="text"
        id="email"
        class="w-full rounded border p-4 text-xl focus:outline-none focus:border-2 focus:border-green-400"
        :class="{
          'border-red-400 focus:border-red-400':
            !form.email.valid && form.email.touched,
        }"
        placeholder="Email"
      />
      <small
        v-if="form.email.errors?.required && form.email.touched"
        class="text-red-500"
        >Email field is required
      </small>
    </div>

    <div class="form__control">
      <label for="password">Password</label>
      <input
        v-model="form.password.value"
        @blur="form.password.blur"
        type="password"
        id="password"
        class="w-full rounded border p-4 text-xl focus:outline-none focus:border-2 focus:border-green-400"
        :class="{
          'border-red-400 focus:border-red-400':
            !form.password.valid && form.password.touched,
        }"
        placeholder="Password"
      />
      <small
        v-if="form.password.errors?.required && form.password.touched"
        class="text-red-500"
        >Password field is required
      </small>
      <small
        v-else-if="form.password.errors?.minLength && form.password.touched"
        class="text-red-500"
        >Password length cannot be less than 8. Now it is
        {{ form.password.value.length }}
      </small>
    </div>

    <BaseButton type="success" :disabled="!form.valid">Submit</BaseButton>
  </form>
</template>


<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";
import { PAGE_TIMELINE } from "@/lib/constants";
import { useForm } from "@/module/form";
import { IForm } from "@/types";
import { useRouter } from "vue-router";

const required = (val?: string) => !!val;
const minLength = (num: number) => (val: string) => val.length >= num;

const form: IForm = useForm({
  email: {
    value: "",
    validators: {
      required,
    },
  },
  password: {
    value: "",
    validators: {
      required,
      minLength: minLength(8),
    },
  },
  valid: false,
});

const router = useRouter();

function submit() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      router.push({ path: `/#${PAGE_TIMELINE}` });
    });

  Object.keys(form).forEach((key) => {
    const field = form[key as keyof IForm];

    if (typeof field !== "boolean") {
      field.value = "";
      field.valid = false;
      field.touched = false;
    }
  });
}
</script>
