<!-- Copyright 2023 Ziad Malik -->

<template>
    <div class="space-y-3">
        <USelect v-model="lectureFilter" :options="lectures ?? ['All Assignments']" />
        <UCheckbox v-model="hidePastDue" label="Hide Past Due Assignments" />
    </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();

const lectureFilter = ref("All Assignments");
const hidePastDue = ref(false);

const { data: lectures } = useAsyncData("lectures", async () => {
    const { data } = await client.from("lectures").select("name");
    return ["All Assignments"].concat(data?.map((lecture) => lecture.name) ?? []);
});
</script>
