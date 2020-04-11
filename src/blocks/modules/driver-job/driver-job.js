import Vue from 'vue';

let driverJob = new Vue ({
   el: '#driverJob',
   data: {
      ofertaOpened: false
   },
   methods: {
      scrollFocus: function (scroll, focus) {
         this.$nextTick(function () {
            document.getElementById(scroll).scrollIntoView();
            document.getElementById(focus).focus();
         });
      }
   }
});