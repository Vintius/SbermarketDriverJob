import "@babel/polyfill";
import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import {mask} from 'vue-the-mask';
import axios from 'axios';

window.submitted = false;

window.driver_job = new Vue ({
    el: '#driverJob',
    components: {
      Multiselect
    },
    directives: {
       mask
    },
    data: {
        ofertaOpened: false,
        cities: [],
        countries: [
          'РФ',
          'Беларусь',
          'Армения',
          'Казахстан'
        ],
        city_value: {name: 'Москва', id: 1},
        country_value: [],
        isTouched: false
    },
    methods: {
        scrollFocus: function (scroll, focus) {
         this.$nextTick(function () {
            document.getElementById(scroll).scrollIntoView();
            document.getElementById(focus).focus();
         });
        }
        // clearSuccess: function () {
        //     if(this.submitted) {
        //         // document.querySelectorAll('input[type=text], input[type=tel]')
        //         //     .forEach(el=>el.value = '');
        //        alert('Форма отправлена');
        //     }
        // }
        // onTouch: function () {
        //     this.isTouched = true
        // }
    },
    created: function () {
      axios.get('https://cors-anywhere.herokuapp.com/https://sbermarket.ru/api/operational_zones?sort=name')
          .then(response => {
             this.cities = response.data.operational_zones;
          })
          .catch(error => {
             console.log(error);
          })
    }
});