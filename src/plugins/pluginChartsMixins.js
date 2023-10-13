import pluginsMixins from './pluginsMixins';
import EchartsBase from '@/modules/echartBase/echartBase.module';
import { extend, throttle } from '@/modules/utils/utils';
import { isEqual } from 'lodash';

// let _this = null

export default {
  mixins: [pluginsMixins],

  methods: {},

  computed: {
    styles() {
      return {
        width: this.custom.width + 'px',
        height: this.custom.height + 'px',
        display: this.show ? 'block' : 'none',
      };
    },
    echartsBase() {
      return new EchartsBase();
    },
  },

  watch: {
    'options.chartConfig': {
      handler(newValue, oldValue) {
        if (!isEqual(newValue, oldValue)) {
          this.echartsBase.setOption(newValue);
        }
      },
      deep: true,
    },
    'custom.width': {
      handler() {
        this.resize();
      },
    },
    'custom.height': {
      handler() {
        this.resize();
      },
    },
  },

  mounted() {
    // _this = this;
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.echartsBase.load(extend(true, {}, this.options.chartConfig), document.querySelector('#' + this.custom.id), this.options.chartTheme);
    },
    resize: throttle(function() {
      this.echartsBase.resize();
    }, 500),
  },
};
