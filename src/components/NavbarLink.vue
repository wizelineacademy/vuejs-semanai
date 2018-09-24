<template>
  <router-link
    tag="li"
    :to="to"
    active-class="active"
    class="nav-item"
    exact>
    <a class="nav-link" href="#">
      {{ label }}
    </a>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
