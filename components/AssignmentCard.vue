<!-- Copyright 2023 Ziad Malik -->

<template>
    <UCard :ui="{ base: 'overflow-visible', body: { base: 'w-[300px]' } }">
        <h1 class="font-semibold">{{ assignment.exerciseName }}</h1>

        <div class="flex flex-wrap gap-2">
            <UButton
                class="mt-3"
                :to="assignment.exercisePDF"
                target="_blank"
                label="Open"
                trailing
                icon="i-heroicons-arrow-down-right"
                size="xs"
            />
            <UButton
                class="mt-3"
                v-if="assignment.solutionPDF"
                :to="assignment.solutionPDF"
                target="_blank"
                label="Solution"
                color="gray"
                icon="i-heroicons-lock-open"
                size="xs"
            />
            <UButton
                class="mt-3"
                v-if="assignment.bonusLink"
                :to="assignment.bonusLink"
                target="_blank"
                label="Bonus"
                color="gray"
                icon="i-heroicons-sparkles"
                size="xs"
            />
        </div>
    </UCard>
</template>

<script setup lang="ts">
const { assignment } = defineProps<{
    assignment: {
        exerciseName: string;
        exercisePDF: string;
        solutionPDF: string | null;
        bonusLink: string | null;
    };
}>();
</script>
