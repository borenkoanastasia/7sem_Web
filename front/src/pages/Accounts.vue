<template>
  <q-page class="row"> </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'AccountsPage',
  setup() {
    const router = useRouter();

    router.push({ path: '/show/accounts' });

    return {};
  },
});
</script>
