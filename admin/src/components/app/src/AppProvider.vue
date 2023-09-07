

<script lang="ts">

import { defineComponent } from 'vue';

const props = {
    prefixCls: { type: String, default: "fly" },
}

export default defineComponent({
    name: "AppProvider",
    inheritAttrs: false,
    props,
    setup(props, { slots }) {

        return () => slots.default?.();
    },
});

</script>