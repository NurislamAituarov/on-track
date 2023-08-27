<template>
  <form
    @submit.prevent="submit"
    class="text-start px-5 py-20 flex flex-col gap-5 max-w-2xl mx-auto my-0"
  >
    <pre>{{ form }}</pre>

    <h1 class="text-5xl">Authorization</h1>

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
      <small
        v-else-if="form.email.errors?.validateEmail && form.email.touched"
        class="text-red-500"
        >Invalid email address.
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

    <BaseButton
      ref="refButton"
      type="success"
      :disabled="!form.valid"
      class="flex justify-center"
    >
      <TheSpinner v-if="loading" />
      <template v-else>Submit</template>
    </BaseButton>
  </form>
</template>


<script setup lang="ts">
import { useRouter } from "vue-router";

import BaseButton from "@/components/base/BaseButton.vue";
import TheSpinner from "@/components/spinner/TheSpinner.vue";
import { PAGE_TIMELINE } from "@/lib/constants";
import { resetForm, useForm } from "@/module/form";
import { IForm } from "@/types";
import { instance } from "@/api";
import { onMounted, ref } from "vue";

const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const required = (val?: string) => !!val;
const minLength = (num: number) => (val: string) => val.length >= num;
const validateEmail = (val: string) => !!val.match(validRegex);

const form: IForm = useForm({
  email: {
    value: "",
    validators: {
      required,
      validateEmail,
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
const loading = ref(false);

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) router.push({ path: `/#${PAGE_TIMELINE}` });
});

interface IData {
  email: string;
  password: string;
  id: number;
}

interface IResponse {
  data: IData;
  status: number;
  statusText: string;
}

async function submit() {
  loading.value = true;
  try {
    const res: IResponse = await instance({
      url: "/posts",
      method: "POST",
      data: { email: form.email.value, password: form.password.value },
    });

    loading.value = false;
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    router.push({ path: `/#${PAGE_TIMELINE}` });
  } catch (e) {
    console.error(e);
  }

  resetForm(form);
}
</script>
