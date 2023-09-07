<template>
    <ConfigProvider>
        <AppProvider>
            <RouterView />
        </AppProvider>
    </ConfigProvider>
</template>

<script setup lang="ts">

import { ConfigProvider } from 'ant-design-vue';
import { AppProvider } from "/@/components/app";

</script>

