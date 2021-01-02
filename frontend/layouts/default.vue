<template>
<div class="flex justify-center bg-gray-200">
  <div class="flex flex-col min-h-screen w-full">
    <NavBar />
    <Buttons class="mx-auto max-w-screen-lg" />
    <Nuxt class="mx-auto max-w-screen-lg flex-grow" />
    <Footer />
  </div>
  <div hidden id="snipcart" data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"></div>
</div>
</template>

<script>
import NavBar from './../components/Navbar'
import Footer from './../components/Footer'
import Buttons from './../components/Buttons'

export default {
  components: {
    NavBar,
    Footer,
    Buttons
  }
}
</script>
