<!-- Copyright 2023 Ziad Malik -->

<template>
    <!-- @vue-ignore -->
    <div v-for="lecture in Object.keys(lecturesToAssignments)" class="py-4 space-y-4">
        <span class="px-2 text-xl font-semibold text-primary-500">{{ lecture }}</span>
        <div class="flex gap-3 overflow-auto px-2 py-2">
            <!-- @vue-ignore -->
            <AssignmentCard v-for="assignment in lecturesToAssignments[lecture]" :assignment="assignment" />
        </div>
    </div>

    <div class="flex flex-col px-2">
        <span class="text-xl font-semibold text-primary-500">Diskrete Mathematik</span>
        <p class="my-2">
            DiscMath exercises are password protected, because apparently people love them so much they steal them and deal with them on the black market. 
            For that reason it is non-trivial to get the exercises and display them on this site.
            Please get them yourself at <UButton variant="link" to="https://dm.crypto.ethz.ch/" label="dm.crypto.ethz.ch" />
        </p>
    </div>
</template>

<script setup lang="ts">
const { data: lecturesToAssignments } = await useFetch("/api/assignments", {
    transform: (data) => {
        const obj = data;

        Object.keys(data).forEach((key) => {
            // @ts-ignore
            obj[key] = obj[key].reverse();
        });

        return obj;
    },
});
</script>
