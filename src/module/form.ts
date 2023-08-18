import { computed, reactive, ref, watch } from 'vue';

interface IValidators {
  required: () => boolean;
  minLength?: any;
}

interface IField {
  valid?: boolean;
  errors?: IErrors;
  value: string;
  touched?: boolean;
  blur?: () => void;
  validators: IValidators;
}

export interface IForm {
  email: IField;
  password: IField;
  valid: boolean;
}

interface IErrors {
  required?: boolean;
  minLength?: boolean;
}

///////////////////////////////////////////////////////////

export function useField(field: IField) {
  const valid = ref(true);
  const value = ref(field.value);
  const touched = ref(false);
  const errors = reactive<IErrors>({});

  function reassign(value: string) {
    valid.value = true;
    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name as keyof IValidators](value);
      errors[name as keyof IValidators] = !isValid;

      if (!isValid) {
        valid.value = false;
      }
    });
  }

  reassign(value.value);

  watch(value, (newValue) => {
    reassign(newValue);
  });

  return { valid, value, errors, touched, blur: () => (touched.value = true) };
}

export function useForm(init: IForm) {
  const form = reactive<IForm | any>({});

  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value);
  }

  form.valid = computed(() => {
    return Object.keys(form)
      .filter((el) => el !== 'valid')
      .reduce((acc, el) => {
        acc = form[el].valid;

        return acc;
      }, true);
  });

  return form;
}
