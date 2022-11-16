<script setup>
  import StartNewWorkout from '@/components/StartNewWorkout';
  import WorkoutsTable from "@/components/WorkoutsTable";
</script>

<template>
  <h1>Workouts</h1>
  <StartNewWorkout />
  <Suspense>
    <template #default>
      <WorkoutsTable />
    </template>
    <template #fallback>
      Loading data or data could not be loading...
    </template>
  </Suspense>
</template>