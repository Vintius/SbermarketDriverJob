import "@babel/polyfill";
import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import {mask} from 'vue-the-mask';
import axios from 'axios';

// window.submitted = false;

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
        fio: '',
        cities: [],
        countries: [
          'РФ',
          'Беларусь',
          'Армения',
          'Казахстан'
        ],
        city_value: {name: 'Москва', id: 1},
        country_value: [],
        carModel: '',
        telValue: '',
        isTouched: false,
        submitError: false,
        submitted: false
    },
    computed: {
      urlVars: function(){
          let uri = window.location.search.substring(1),
              vars = uri.split('&'),
              getVars = {},
              tmp = [];

          vars.forEach(function(v){
              tmp = v.split('=');
              if(tmp.length === 2){
                  getVars[tmp[0]] = tmp[1];
              }
          });
          return getVars;
      },
        errorCheck: function () {
            if (window.submitted && this.country_value.length === 0){
                return true;
            }
        }
    },
    methods: {
        scrollFocus: function (scroll, focus) {
         this.$nextTick(function () {
            document.getElementById(scroll).scrollIntoView();
            document.getElementById(focus).focus();
         });
        },
        debug: function () {
            debugger;
        },
        submitCheck: function (e) {
            if (!this.country_value.length || this.telValue.length < 18 || (this.fio || this.carModel).match(/^[ ]+$/)) {
                e.preventDefault();
                this.submitError = true;
                // this.submitted = false;
            }
            else {
                this.submitError = false;
                this.submitted = true;
            }
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
      axios.get('https://sbermarket.ru/api/operational_zones?sort=name')
          .then(response => {
             this.cities = response.data.operational_zones;
          })
          .catch(error => {
             console.log(error);
          })
    }
});