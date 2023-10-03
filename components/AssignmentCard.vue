<!-- Copyright 2023 Ziad Malik -->

<template>
    <UCard :ui="{ base: 'overflow-visible', body: { base: 'w-[320px]' } }">
        <div class="flex justify-between items-center">
            <h1 class="font-semibold">{{ assignment.exerciseName }}</h1>
            <div class="text-sm opacity-50 font-semibold flex gap-1 items-center">
                <UIcon name="i-heroicons-clock" />
                <span>
                    Due {{ formatDate(new Date(assignment.dueDate)) }}
                </span>
            </div>
        </div>
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
        dueDate: Date;
    };
}>();

function formatDate(date: Date) {
    // Get the current date
    const currentDate = new Date();

    // Check if the provided date is in the past
    if (date < currentDate) {
        // If it's in the past, return the date as a locale date string
        return "on " + date.toLocaleDateString();
    } else {
        // If it's in the future, calculate the difference in days
        const timeDifference = date.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        // Construct the "in N days" string
        return `in ${daysDifference} day(s)`;
    }
}
</script>
