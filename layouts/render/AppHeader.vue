<template>
  <div>
    <header>
      <nav class="w-full bg-blue-700">
        <div class="container px-6 h-16 flex justify-between items-center lg:items-stretch mx-auto">
          <div class="flex items-center">
            <div class="mr-10 flex items-center">
              <a href="/"><img src="~assets/images/logo3.png" alt="Prezaty" class="w-32" /></a>
            </div>
          </div>
          <div class="h-full hidden xl:flex items-center justify-end">
            <div class="flex items-center pl-8 relative cursor-pointer">
              <div class="flex items-center pl-8 relative cursor-pointer" @click="dropdownHandler($event)">
                <ul class="p-1 w-40 border-r bg-white absolute rounded right-0 z-50 shadow mt-16 top-0 hidden">
                  <li @click="logout()" class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-blue-700 flex items-center focus:text-blue-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span class="ml-2">Sair</span>
                  </li>
                </ul>
                <svg class="inline-block text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                </svg>
                <p class="text-white text-sm ml-2">{{ user.name }}</p>
              </div>
            </div>
          </div>
          <div class="visible xl:hidden z-50 flex items-center">
            <ul class="p-2 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-16 md:mt-16 hidden">
              <li class="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-blue-700 focus:text-blue-700 focus:outline-none">
                <div @click="openMenu('/dashboard', $event)" class="flex items-center">                    
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-grid" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="ml-2 font-bold">Dashboard</span>
                </div>
              </li>
              <li class="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-blue-700 focus:text-blue-700 focus:outline-none">
                <div @click="openMenu('/setup', $event)" class="flex items-center">
                  <svg class="icon icon-tabler icon-tabler-grid" width="20" height="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 429.056 429.056" style="enable-background:new 0 0 429.056 429.056;" xml:space="preserve">
                  <g>
                    <g>
                      <path class="text-gray-600 hover:text-blue-700 focus:text-blue-700" d="M413.696,182.272h-21.504v-68.096c-0.512-8.192-7.168-14.848-15.36-15.36H229.888V4.608h-30.72v94.208H52.224
                        c-8.192,0.512-14.848,7.168-15.36,15.36v68.096H15.36c-8.704,0-15.36,6.656-15.36,15.36v101.376c0,8.704,6.656,15.36,15.36,15.36
                        h21.504v94.72c0.512,8.192,7.168,14.848,15.36,15.36h324.608c8.192-0.512,14.848-7.168,15.36-15.36v-94.72h21.504
                        c8.704,0,15.36-6.656,15.36-15.36V197.632C429.056,188.928,422.4,182.272,413.696,182.272z M100.352,218.624
                        c0-24.576,19.968-44.544,44.544-44.544s44.544,19.968,44.544,44.544s-19.968,44.544-44.544,44.544S100.352,243.2,100.352,218.624z
                        M282.112,352.256H146.944v-30.72h135.168V352.256z M328.704,218.624c0,24.576-19.968,44.544-44.544,44.544
                        c-25.088,0-45.056-19.968-45.568-44.544c0-25.088,19.968-45.056,44.544-45.568c24.576-0.512,45.056,19.968,45.568,44.544
                        C328.704,218.112,328.704,218.112,328.704,218.624z"/>
                    </g>
                  </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                  </svg>
                  <span class="ml-2 font-bold">Meus Robôs</span>
                </div>
              </li>
              <li class="border-b border-gray-300 flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-blue-700 focus:text-blue-700 focus:outline-none">
                <div @click="openMenu('/help', $event)" class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-grid" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span class="ml-2 font-bold">Ajuda</span>
                </div>
              </li>
              <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-blue-700 focus:text-blue-700 focus:outline-none">
                <div @click="logout()" class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span class="ml-2">Sair</span>
                </div>
              </li>
            </ul>
            <svg @click="MenuHandler($event, true)" aria-haspopup="true" aria-label="Main Menu" xmlns="http://www.w3.org/2000/svg" class="text-white show-m-menu icon icon-tabler icon-tabler-menu" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
            </svg>
            <div class="hidden close-m-menu" @click="MenuHandler($event, false)">
              <svg aria-label="Close" xmlns="http://www.w3.org/2000/svg" class="text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
        </div>
        <div class="hidden bg-blue-700 md:block md:bg-white md:border-b">
          <div class="container mx-auto px-4">
            <div class="md:flex">
              <div class="flex -mb-px mr-8">
                <nuxt-link to="/dashboard" class="no-underline opacity-60 text-gray-700 md:opacity-60 flex items-center py-4 border-b border-transparent hover:opacity-60 md:hover:border-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Dashboard
                </nuxt-link>
              </div>
              <div class="flex -mb-px mr-8">
                <nuxt-link to="/setup" class="no-underline opacity-60 text-gray-700 md:opacity-60 flex items-center py-4 border-b border-transparent hover:opacity-60 md:hover:border-gray-700">
                  <svg class="h-6 w-6 fill-current mr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 429.056 429.056" style="enable-background:new 0 0 429.056 429.056;" xml:space="preserve">
                  <g>
                    <g>
                      <path d="M413.696,182.272h-21.504v-68.096c-0.512-8.192-7.168-14.848-15.36-15.36H229.888V4.608h-30.72v94.208H52.224
                        c-8.192,0.512-14.848,7.168-15.36,15.36v68.096H15.36c-8.704,0-15.36,6.656-15.36,15.36v101.376c0,8.704,6.656,15.36,15.36,15.36
                        h21.504v94.72c0.512,8.192,7.168,14.848,15.36,15.36h324.608c8.192-0.512,14.848-7.168,15.36-15.36v-94.72h21.504
                        c8.704,0,15.36-6.656,15.36-15.36V197.632C429.056,188.928,422.4,182.272,413.696,182.272z M100.352,218.624
                        c0-24.576,19.968-44.544,44.544-44.544s44.544,19.968,44.544,44.544s-19.968,44.544-44.544,44.544S100.352,243.2,100.352,218.624z
                        M282.112,352.256H146.944v-30.72h135.168V352.256z M328.704,218.624c0,24.576-19.968,44.544-44.544,44.544
                        c-25.088,0-45.056-19.968-45.568-44.544c0-25.088,19.968-45.056,44.544-45.568c24.576-0.512,45.056,19.968,45.568,44.544
                        C328.704,218.112,328.704,218.112,328.704,218.624z"/>
                    </g>
                  </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                  </svg>
                  Meus Robôs
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>

export default {
  middleware: "auth",
  layout: "app",
  data() {
    return {
      user: this.$auth.user
    };
  },
  methods: {
    dropdownHandler(event) {
      let single = event.currentTarget.getElementsByTagName("ul")[0];
      single.classList.toggle("hidden");
    },
    openMenu(target, el) {
      this.$router.push(target)
      this.MenuHandler(el, true)  
    },
    MenuHandler(el, val) {
      let MainList = el.currentTarget.parentElement.getElementsByTagName("ul")[0];
      let closeIcon = el.currentTarget.parentElement.getElementsByClassName(
        "close-m-menu"
      )[0];
      let showIcon = el.currentTarget.parentElement.getElementsByClassName(
        "show-m-menu"
      )[0];
      if (val) {
        MainList.classList.remove("hidden");
        el.currentTarget.classList.add("hidden");
        closeIcon.classList.remove("hidden");
      } else {
        showIcon.classList.remove("hidden");
        MainList.classList.add("hidden");
        el.currentTarget.classList.add("hidden");
      }
    },
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
