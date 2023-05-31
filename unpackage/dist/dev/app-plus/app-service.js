if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _sfc_main$F = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-status",
    props: {
      bgColor: { type: [String, Object], required: false, default: "#F0F4F7" }
    },
    setup(__props, { expose }) {
      const data = __props;
      let statusBarHeight = vue.ref(0);
      const statusStyle = vue.computed(() => {
        return `
			height: ${statusBarHeight.value}px;
			background: ${data.bgColor};
		`;
      });
      vue.onMounted(() => {
        statusBarHeight.value = getApp().globalData.statusBarHeight;
      });
      expose({
        statusBarHeight
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "lz-status",
            style: vue.normalizeStyle(vue.unref(statusStyle))
          },
          null,
          4
          /* STYLE */
        );
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const lzStatus = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-40844bb6"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-status/lz-status.vue"]]);
  const _sfc_main$E = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-nav-bar",
    props: {
      bgColor: { type: [String, Object], required: false, default: "#F0F4F7" },
      statusBgColor: { type: [String, Object], required: false, default: "#F0F4F7" },
      titleStyle: { type: String, required: false },
      leftIcon: { type: String, required: false, default: "" },
      leftText: { type: String, required: false, default: "" },
      leftIconSize: { type: [String, Number], required: false, default: 32 },
      leftIconColor: { type: [String, Number], required: false, default: "#000" },
      rightIcon: { type: String, required: false, default: "" },
      rightText: { type: String, required: false, default: "" },
      isBack: { type: Boolean, required: false, default: true }
    },
    emits: ["click", "rightIcon", "leftIcon"],
    setup(__props, { emit }) {
      const data = __props;
      let statusRef = vue.ref(null);
      let status = vue.ref(0);
      const navBarStyle = vue.computed(() => {
        return `
			top:${status.value}px;
			height: ${navBarHeight.value}px;
			background: ${data.bgColor};
		`;
      });
      const leftIconStyle = vue.computed(() => {
        return `
			font-size: ${data.leftIconSize}rpx;
			color: ${data.leftIconColor};
		`;
      });
      const navleftIcon = () => {
        if (data.isBack) {
          uni.navigateBack();
          return;
        }
        emit("leftIcon");
      };
      const navRightIcon = () => {
        emit("rightIcon");
      };
      let navBarHeight = vue.ref(0);
      vue.onMounted(() => {
        navBarHeight.value = getApp().globalData.navHeight;
        status.value = statusRef.value.statusBarHeight;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "wrap" }, [
          vue.createVNode(lzStatus, {
            bgColor: data.statusBgColor,
            ref_key: "statusRef",
            ref: statusRef
          }, null, 8, ["bgColor"]),
          vue.createElementVNode(
            "view",
            {
              class: "nav-bar",
              style: vue.normalizeStyle(vue.unref(navBarStyle))
            },
            [
              vue.renderSlot(_ctx.$slots, "content", {}, () => [
                vue.createElementVNode("view", { class: "nav-bar-left" }, [
                  data.leftIcon ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "iconfont left-icon",
                      style: vue.normalizeStyle(vue.unref(leftIconStyle)),
                      onClick: navleftIcon
                    },
                    vue.toDisplayString(data.leftIcon),
                    5
                    /* TEXT, STYLE */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    { class: "left-text" },
                    vue.toDisplayString(data.leftText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "nav-bar-right" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(data.rightText),
                    1
                    /* TEXT */
                  ),
                  __props.rightIcon ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "iconfont",
                      onClick: navRightIcon
                    },
                    vue.toDisplayString(data.rightIcon),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ])
              ], true)
            ],
            4
            /* STYLE */
          )
        ]);
      };
    }
  });
  const lzNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-460e1b87"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-nav-bar/lz-nav-bar.vue"]]);
  const _sfc_main$D = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-agreement",
    setup(__props, { expose }) {
      let checked = vue.ref(false);
      const checkboxChange = () => {
        checked.value = !checked.value;
      };
      expose({
        checked
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "agreement" }, [
          vue.createElementVNode("label", { class: "agreement-label" }, [
            vue.createElementVNode(
              "checkbox-group",
              { onChange: checkboxChange },
              [
                vue.createElementVNode("checkbox", {
                  value: "agreement",
                  checked: vue.unref(checked),
                  color: "#ED4C46",
                  style: { "transform": "scale(0.5)" }
                }, null, 8, ["checked"]),
                vue.createElementVNode("text", null, "同意并阅读"),
                vue.createElementVNode("text", { class: "agreement-link" }, "《用户协议》"),
                vue.createElementVNode("text", null, "与"),
                vue.createElementVNode("text", { class: "agreement-link" }, "《隐私政策》")
              ],
              32
              /* HYDRATE_EVENTS */
            )
          ])
        ]);
      };
    }
  });
  const lzAgreement = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-a0039076"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-agreement/lz-agreement.vue"]]);
  const _sfc_main$C = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-popup",
    props: {
      maskColor: { type: Boolean, required: false, default: false },
      mask: { type: Boolean, required: false, default: true },
      fixedBottom: { type: Boolean, required: false, default: false },
      bodyWidth: { type: Number, required: false, default: 0 },
      bodyHeight: { type: Number, required: false, default: 0 },
      title: { type: String, required: false, default: "title" },
      center: { type: Boolean, required: false, default: false },
      rounded: { type: [Number, String], required: false, default: 20 },
      headerH: { type: [Number, String], required: false, default: 0 },
      footerH: { type: [Number, String], required: false, default: 0 },
      isHeader: { type: Boolean, required: false, default: false },
      isFooter: { type: Boolean, required: false, default: false },
      leftIcon: { type: String, required: false, default: "" },
      rightIcon: { type: String, required: false, default: "" },
      bgColor: { type: String, required: false, default: "#fff" },
      centerStyle: { type: [Object, String], required: false }
    },
    setup(__props, { expose }) {
      const data = __props;
      let status = vue.ref(false);
      let X = -1;
      let Y = -1;
      let maxX = 0;
      let maxY = 0;
      const getMaskColor = vue.computed(() => {
        let i = data.maskColor ? 0.5 : 0;
        return `background-color: rgba(0, 0, 0, ${i});`;
      });
      const getBodyClass = vue.computed(() => {
        let fixedBottom = data.fixedBottom ? "bodyClass" : "rounded";
        return fixedBottom;
      });
      const getBodyStyle = vue.computed(() => {
        let left = X > -1 ? `left:${X}px;` : ``;
        let top = Y > -1 ? `top:${Y}px;` : ``;
        return `
			${left};
			${top};
			border-radius: ${data.rounded}rpx;
			width: ${data.bodyWidth}rpx;
			height: ${data.bodyHeight}rpx;
			background: ${data.bgColor};
		`;
      });
      const show = (x = -1, y = -1) => {
        X = x > maxX ? maxX : x;
        Y = y > maxY ? maxY : y;
        status.value = true;
      };
      const hide = () => {
        status.value = false;
      };
      const popupStyle = vue.computed(() => {
        if (data.center) {
          return `
				display: flex;
				align-items: center;
				justify-content: center;
			`;
        }
      });
      const popupHeaderStyle = vue.computed(() => {
        return `
			height: ${data.headerH}rpx;
		`;
      });
      const popupContentStyle = vue.computed(() => {
        if (data.center) {
          return `
				top: ${data.headerH}rpx;
				bottom: ${data.footerH}rpx;
			`;
        }
      });
      const popupFooterStyle = vue.computed(() => {
        return `
			height: ${data.footerH}rpx;
		`;
      });
      vue.onMounted(() => {
        try {
          const res = uni.getSystemInfoSync();
          maxX = res.windowWidth - uni.upx2px(data.bodyWidth);
          maxY = res.windowHeight - uni.upx2px(data.bodyHeight);
        } catch (e) {
        }
      });
      expose({
        show,
        hide
      });
      return (_ctx, _cache) => {
        return vue.unref(status) ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: "lz-popup-wrap",
            style: vue.normalizeStyle(vue.unref(popupStyle))
          },
          [
            data.mask ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 0,
                class: "mask",
                style: vue.normalizeStyle(vue.unref(getMaskColor)),
                onClick: hide
              },
              null,
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(["lz-popup-box", vue.unref(getBodyClass)]),
                style: vue.normalizeStyle(vue.unref(getBodyStyle))
              },
              [
                vue.renderSlot(_ctx.$slots, "top", {}, void 0, true),
                data.isHeader ? (vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: "lz-popup-header",
                    style: vue.normalizeStyle(vue.unref(popupHeaderStyle))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "header", {}, () => [
                      vue.createElementVNode("view", { class: "popup-header-left" }, [
                        vue.renderSlot(_ctx.$slots, "header-left", {}, () => [
                          vue.createElementVNode(
                            "text",
                            { class: "iconfont popup-icon" },
                            vue.toDisplayString(data.leftIcon),
                            1
                            /* TEXT */
                          )
                        ], true)
                      ]),
                      vue.createElementVNode(
                        "view",
                        {
                          class: "popup-header-center",
                          style: vue.normalizeStyle(data.centerStyle)
                        },
                        [
                          vue.createElementVNode(
                            "text",
                            { class: "popup-header-title" },
                            vue.toDisplayString(data.title),
                            1
                            /* TEXT */
                          )
                        ],
                        4
                        /* STYLE */
                      ),
                      vue.createElementVNode("view", {
                        class: "popup-header-right",
                        onClick: hide
                      }, [
                        vue.createElementVNode(
                          "text",
                          { class: "iconfont popup-icon" },
                          vue.toDisplayString(data.rightIcon),
                          1
                          /* TEXT */
                        )
                      ])
                    ], true)
                  ],
                  4
                  /* STYLE */
                )) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode(
                  "div",
                  {
                    class: "lz-popup-content",
                    style: vue.normalizeStyle(vue.unref(popupContentStyle))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  4
                  /* STYLE */
                ),
                data.isFooter ? (vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: 1,
                    class: "lz-popup-footer",
                    style: vue.normalizeStyle(vue.unref(popupFooterStyle))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "footer", {}, void 0, true)
                  ],
                  4
                  /* STYLE */
                )) : vue.createCommentVNode("v-if", true)
              ],
              6
              /* CLASS, STYLE */
            )
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  const lzPopup = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-14a8b2cc"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-popup/lz-popup.vue"]]);
  const _sfc_main$B = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const menus = [
        {
          img: "/static/images/common/wx.png",
          type: 1
        },
        {
          img: "/static/images/common/qq.png",
          type: 2
        },
        {
          img: "/static/images/common/wb.png",
          type: 3
        }
      ];
      const agreement = vue.ref(null);
      const popup = vue.ref();
      const login = (type) => {
        if (!agreement.value.checked)
          return popup.value.show();
        switch (type) {
          case 0:
            emailLogin();
            break;
        }
      };
      const emailLogin = () => {
        uni.navigateTo({
          url: "/pages/accountManagement/emailLogin/emailLogin"
        });
      };
      const handlePopupBtn = (type) => {
        if (type == 0)
          return popup.value.hide();
        agreement.value.checked = true;
        popup.value.hide();
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "login-wrap" }, [
              vue.createVNode(lzNavBar, {
                "left-icon": "",
                "bg-color": "#fff",
                statusBgColor: "#fff"
              }),
              vue.createElementVNode(
                "view",
                {
                  class: "login-content",
                  style: vue.normalizeStyle(vue.unref(contentStyle))
                },
                [
                  vue.createElementVNode("view", { class: "logo-box" }, [
                    vue.createElementVNode("image", {
                      class: "logo-img",
                      src: "/static/images/common/logo.png"
                    }),
                    vue.createElementVNode("text", { class: "logo-name" }, "Todo 计划")
                  ]),
                  vue.createElementVNode("view", {
                    class: "btn-box",
                    onClick: _cache[0] || (_cache[0] = ($event) => login(0))
                  }, [
                    vue.createElementVNode("image", {
                      class: "email-img",
                      src: "/static/images/common/email.png"
                    }),
                    vue.createElementVNode("text", { class: "btn-txt" }, "邮箱登录/注册")
                  ]),
                  vue.createVNode(
                    lzAgreement,
                    {
                      ref_key: "agreement",
                      ref: agreement
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ),
                  vue.createElementVNode("view", { class: "features-menu" }, [
                    (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(menus, (item) => {
                        return vue.createElementVNode("view", {
                          class: "features-menu-item",
                          key: item.type,
                          onClick: ($event) => login(item.type)
                        }, [
                          vue.createElementVNode("image", {
                            class: "features-menu-img",
                            src: item.img
                          }, null, 8, ["src"])
                        ], 8, ["onClick"]);
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ])
                ],
                4
                /* STYLE */
              )
            ]),
            vue.createVNode(
              lzPopup,
              {
                ref_key: "popup",
                ref: popup,
                center: "",
                "mask-color": "",
                "body-width": 638,
                "body-height": 320
              },
              {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "login-popup-wrap" }, [
                    vue.createElementVNode("view", { class: "title" }, [
                      vue.createElementVNode("text", null, "用户协议及隐私保护")
                    ]),
                    vue.createElementVNode("view", { class: "login-popup-content" }, [
                      vue.createElementVNode("text", { class: "text" }, "已阅读并同意"),
                      vue.createElementVNode("text", { class: "link-text" }, "《用户协议》"),
                      vue.createElementVNode("text", { class: "text" }, "和"),
                      vue.createElementVNode("text", { class: "link-text" }, "《隐私政策》")
                    ]),
                    vue.createElementVNode("view", { class: "login-popup-bottom" }, [
                      vue.createElementVNode("view", {
                        class: "popup-btn",
                        onClick: _cache[1] || (_cache[1] = ($event) => handlePopupBtn(0))
                      }, [
                        vue.createElementVNode("text", null, "拒绝")
                      ]),
                      vue.createElementVNode("view", {
                        class: "popup-btn",
                        onClick: _cache[2] || (_cache[2] = ($event) => handlePopupBtn(1))
                      }, [
                        vue.createElementVNode("text", null, "同意")
                      ])
                    ])
                  ])
                ]),
                _: 1
                /* STABLE */
              },
              512
              /* NEED_PATCH */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-e4e4508d"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/login/login.vue"]]);
  const _sfc_main$A = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-tab-bar",
    props: {
      current: { type: Number, required: true, default: 0 }
    },
    emits: ["click"],
    setup(__props, { emit }) {
      const data = __props;
      let paddingBottomHeight = vue.ref(0);
      uni.getSystemInfo({
        success: function(res) {
          let model = ["X", "XR", "XS", "11", "12", "13", "14", "15"];
          model.forEach((item) => {
            if (res.model.indexOf(item) != -1 && res.model.indexOf("iPhone") != -1) {
              paddingBottomHeight.value = 40;
            }
          });
        }
      });
      const list = [
        {
          text: "",
          icon: "/static/images/tabBar/index.png",
          iconPath: "/static/images/tabBar/index_active.png",
          path: "/pages/tabBar/index/index"
        },
        {
          text: "",
          icon: "/static/images/tabBar/calendar.png",
          iconPath: "/static/images/tabBar/calendar_active.png",
          path: "/pages/tabBar/calendar/calendar"
        },
        {
          text: "",
          icon: "/static/images/tabBar/quadrants.png",
          iconPath: "/static/images/tabBar/quadrants_active.png",
          path: "/pages/tabBar/quadrants/quadrants"
        },
        {
          text: "",
          icon: "/static/images/tabBar/habit_building_system.png",
          iconPath: "/static/images/tabBar/habit_building_system_active.png",
          path: "/pages/tabBar/habitBuildingSystem/main"
        },
        {
          text: "",
          icon: "/static/images/tabBar/user_profile.png",
          iconPath: "/static/images/tabBar/user_profile_active.png",
          path: "/pages/tabBar/userProfile/userProfile"
        }
      ];
      const handleTabBarChange = (path) => {
        uni.redirectTo({
          url: path
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "tabbar",
            style: vue.normalizeStyle({ "padding-bottom": vue.unref(paddingBottomHeight) + "rpx" })
          },
          [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(list, (item, index) => {
                return vue.createElementVNode("view", {
                  class: "tabbar-item",
                  key: index,
                  onClick: ($event) => handleTabBarChange(item.path)
                }, [
                  data.current == index ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    class: "tabbar-item-img",
                    src: item.iconPath
                  }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("image", {
                    key: 1,
                    class: "tabbar-item-img",
                    src: item.icon
                  }, null, 8, ["src"]))
                ], 8, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const lzTabBar = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-cbc872e1"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-tab-bar/lz-tab-bar.vue"]]);
  const _sfc_main$z = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-select-icon",
    setup(__props, { expose }) {
      const seletIconArr = [
        {
          icon: "",
          name: "工作"
        },
        {
          icon: "",
          name: "学习"
        },
        {
          icon: "",
          name: "生活"
        },
        {
          icon: "",
          name: "娱乐"
        },
        {
          icon: "",
          name: "运动"
        },
        {
          icon: "",
          name: "美食"
        },
        {
          icon: "",
          name: "医疗"
        },
        {
          icon: "",
          name: "出行"
        },
        {
          icon: "",
          name: "野营"
        },
        {
          icon: "",
          name: "孕儿"
        },
        {
          icon: "",
          name: "宠物"
        },
        {
          icon: "",
          name: "纪念日"
        },
        {
          icon: "",
          name: "购物"
        },
        {
          icon: "",
          name: "礼物"
        },
        {
          icon: "",
          name: "手账"
        }
      ];
      const popup = vue.ref();
      const show = () => {
        popup.value.show();
      };
      let current = vue.ref(-1);
      const handlePopupItem = (index) => {
        current.value = index;
      };
      const popupItemStyle = vue.computed(() => {
        return function(index) {
          return current.value == index ? "popup-item active-popup-item" : "popup-item";
        };
      });
      const iconWrapStyle = vue.computed(() => {
        return function(index) {
          let bgColor = current.value == index ? "#E96161" : "#fff";
          return `background-color: ${bgColor};`;
        };
      });
      expose({
        show
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(
          lzPopup,
          {
            ref_key: "popup",
            ref: popup,
            title: "选择图标",
            "body-width": 696,
            "body-height": 552,
            "is-header": "",
            center: "",
            "mask-color": "",
            "header-h": 112,
            "right-icon": "",
            "left-icon": ""
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popup-content" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(seletIconArr, (item, index) => {
                    return vue.createElementVNode("view", {
                      key: index,
                      class: vue.normalizeClass(vue.unref(popupItemStyle)(index)),
                      onClick: ($event) => handlePopupItem(index)
                    }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: "icon-wrap",
                          style: vue.normalizeStyle(vue.unref(iconWrapStyle)(index))
                        },
                        [
                          vue.createElementVNode(
                            "text",
                            { class: "iconfont" },
                            vue.toDisplayString(item.icon),
                            1
                            /* TEXT */
                          )
                        ],
                        4
                        /* STYLE */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "name" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      )
                    ], 10, ["onClick"]);
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  });
  const lzSelectIcon = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-36846263"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/index/cpn/lz-select-icon.vue"]]);
  const _sfc_main$y = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-task-sorting",
    setup(__props, { expose }) {
      const list = [
        {
          name: "自定义排序"
        },
        {
          name: "时间排序"
        },
        {
          name: "清单排序"
        },
        {
          name: "重要程度排序"
        }
      ];
      const popup = vue.ref();
      const show = () => {
        popup.value.show();
      };
      let current = vue.ref(-1);
      const handlePopupItem = (index) => {
        current.value = index;
      };
      expose({
        show
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(
          lzPopup,
          {
            ref_key: "popup",
            ref: popup,
            title: "任务排序",
            "body-width": 610,
            "body-height": 560,
            center: "",
            "mask-color": "",
            "is-header": "",
            "header-h": 122
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popup-content" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(list, (item, index) => {
                    return vue.createElementVNode("view", {
                      class: "popup-item",
                      key: index,
                      onClick: ($event) => handlePopupItem(index)
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "name" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      ),
                      vue.unref(current) == index ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "iconfont icon-gouxuan"
                      })) : vue.createCommentVNode("v-if", true)
                    ], 8, ["onClick"]);
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  });
  const lzTaskSorting = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-ab49f8db"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/index/cpn/lz-task-sorting.vue"]]);
  const _sfc_main$x = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-switch",
    emits: ["click"],
    setup(__props, { emit }) {
      let modelValue = vue.ref(false);
      const toggleSwitch = () => {
        modelValue.value = !modelValue.value;
        emit("click", modelValue.value);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "div",
          {
            class: vue.normalizeClass(["switch", { "switch--on": vue.unref(modelValue), "switch--off": !vue.unref(modelValue) }]),
            onClick: toggleSwitch
          },
          [
            vue.createElementVNode("div", { class: "switch__button" })
          ],
          2
          /* CLASS */
        );
      };
    }
  });
  const lzSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-276639d4"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-switch/lz-switch.vue"]]);
  const _sfc_main$w = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-cell",
    props: {
      title: { type: [String, Number], required: true, default: "提示铃声" },
      label: { type: [String, Number], required: false, default: "" },
      value: { type: [String, Number, Boolean], required: false },
      icon: { type: String, required: false, default: "" },
      rightIcon: { type: String, required: false, default: "/static/images/common/arrow-right.png" },
      url: { type: String, required: false },
      height: { type: [String, Number], required: false, default: 108 },
      type: { type: [String, Number], required: false, default: "text" },
      isRightIcon: { type: Boolean, required: false, default: true },
      radius: { type: [String, Number], required: false, default: 0 },
      padding: { type: Array, required: false, default: () => [0, 0] },
      rightIconStyle: { type: [Object, String], required: false, default: "width: 28rpx;height: 28rpx;" },
      titleStyle: { type: [Object, String], required: false },
      labelStyle: { type: [Object, String], required: false },
      leftIconStyle: { type: [Object, String], required: false }
    },
    emits: ["switchChange"],
    setup(__props, { emit }) {
      const data = __props;
      const topStyle = vue.computed(() => {
        return `
			height: ${data.height}rpx;
		`;
      });
      const cellStyle = vue.computed(() => {
        return `
			border-radius: ${data.radius}rpx;
			padding: ${data.padding[0]}rpx ${data.padding[1]}rpx
		`;
      });
      const toggleSwitch = (value) => {
        emit("switchChange", value);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "lz-cell",
            style: vue.normalizeStyle(vue.unref(cellStyle))
          },
          [
            vue.createElementVNode("view", { class: "lz-cell-left" }, [
              vue.createElementVNode(
                "view",
                {
                  class: "left-info",
                  style: vue.normalizeStyle(vue.unref(topStyle))
                },
                [
                  vue.createElementVNode("view", { class: "left-info-content" }, [
                    vue.createElementVNode("view", { class: "left-info-top" }, [
                      data.icon ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        class: "iconfont icon",
                        src: data.icon,
                        style: vue.normalizeStyle(data.leftIconStyle)
                      }, null, 12, ["src"])) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode(
                          "text",
                          {
                            class: "title",
                            style: vue.normalizeStyle(data.titleStyle)
                          },
                          vue.toDisplayString(data.title),
                          5
                          /* TEXT, STYLE */
                        ),
                        data.label ? (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 0,
                            class: "label",
                            style: vue.normalizeStyle(data.labelStyle)
                          },
                          vue.toDisplayString(data.label),
                          5
                          /* TEXT, STYLE */
                        )) : vue.createCommentVNode("v-if", true)
                      ])
                    ])
                  ])
                ],
                4
                /* STYLE */
              )
            ]),
            vue.createElementVNode("view", { class: "lz-cell-right" }, [
              data.value && data.type == "text" ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  class: "value"
                },
                vue.toDisplayString(data.value),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true),
              data.type == "img" ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                class: "img",
                src: data.value
              }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(' <text class="iconfont right-icon" v-if="!data.value && data.isRightIcon">{{data.rightIcon}}</text> '),
              data.isRightIcon ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 2,
                class: "iconfont right-icon",
                src: data.rightIcon,
                style: vue.normalizeStyle(data.rightIconStyle)
              }, null, 12, ["src"])) : vue.createCommentVNode("v-if", true),
              data.type == "switch" ? (vue.openBlock(), vue.createBlock(lzSwitch, {
                key: 3,
                onClick: toggleSwitch
              })) : vue.createCommentVNode("v-if", true)
            ])
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const lzCell = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-56bcea8a"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-cell/lz-cell.vue"]]);
  const _sfc_main$v = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-feature-list",
    props: {
      data: { type: Array, required: true },
      name: { type: String, required: false, default: "" },
      height: { type: [String, Number], required: false, default: 108 },
      marginTop: { type: [String, Number], required: false, default: 20 },
      padding: { type: Array, required: false, default: () => [0, 20] },
      labelStyle: { type: [Object, String], required: false },
      leftIconStyle: { type: [Object, String], required: false }
    },
    emits: ["click", "switchChange"],
    setup(__props, { emit }) {
      const data = __props;
      const featureListStyle = vue.computed(() => {
        return `
			margin-top: ${data.marginTop}rpx;
			padding: ${data.padding[0]}rpx ${data.padding[1]}rpx;
		`;
      });
      const handleCell = (item) => {
        emit("click", item);
      };
      const switchChange = (value) => {
        emit("switchChange", value);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "lz-feature-list",
            style: vue.normalizeStyle(vue.unref(featureListStyle))
          },
          [
            data.name ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "feature-list-title"
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data.name),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(data.data, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "cell",
                  key: index,
                  onClick: ($event) => handleCell(item)
                }, [
                  vue.createVNode(lzCell, {
                    title: item.title,
                    icon: item.icon,
                    "right-icon": item.rightIcon,
                    value: item.value,
                    height: data.height,
                    "is-right-icon": item.isRightIcon,
                    type: item.type,
                    label: item.label,
                    "label-style": data.labelStyle,
                    "left-icon-style": data.leftIconStyle,
                    onSwitchChange: switchChange
                  }, null, 8, ["title", "icon", "right-icon", "value", "height", "is-right-icon", "type", "label", "label-style", "left-icon-style"])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const lzFeatureList = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-aaa26639"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-feature-list/lz-feature-list.vue"]]);
  const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-create-list",
    setup(__props, { expose }) {
      const list = [
        {
          title: "清单图标",
          value: ""
        },
        {
          title: "文件夹",
          value: "无"
        }
      ];
      let inputText = vue.ref("");
      const popup = vue.ref();
      const show = () => {
        popup.value.show();
      };
      vue.ref(-1);
      expose({
        show
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(
          lzPopup,
          {
            ref_key: "popup",
            ref: popup,
            title: "新建清单",
            "body-width": 690,
            "body-height": 492,
            "header-h": 122,
            "mask-color": "",
            "is-header": "",
            center: "",
            "left-icon": "",
            "right-icon": ""
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popup-content" }, [
                vue.createElementVNode("view", { class: "input-wrap" }, [
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "popup-content-input",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(inputText) ? inputText.value = $event : inputText = $event),
                      placeholder: "清单名称",
                      "placeholder-class": "plc"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, vue.unref(inputText)]
                  ])
                ]),
                vue.createElementVNode("view", { class: "popup-content-cell" }, [
                  vue.createVNode(lzFeatureList, {
                    height: 100,
                    data: list,
                    "margin-top": 10,
                    padding: [0, 20]
                  })
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  });
  const lzCreateList = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-d3f7a9ea"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/index/cpn/lz-create-list.vue"]]);
  const _sfc_main$t = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-recursive-menu",
    props: {
      list: { type: Array, required: true, default: () => [] },
      indent: { type: Number, required: false, default: 0 },
      displayMode: { type: Boolean, required: false, default: false },
      padding: { type: Array, required: false },
      type: { type: String, required: false, default: "" }
    },
    emits: ["expanded"],
    setup(__props, { emit }) {
      const data = __props;
      const dataStyle = vue.computed(() => {
        return function(item) {
          let color = item.type == "parent" ? "#E96161" : "";
          let size = data.type == "quadrants" ? 16 : 20;
          return `
				color: ${color};
				font-size: ${size}rpx;
			`;
        };
      });
      const cellStyle = vue.computed(() => {
        return function(item) {
          if (item.name) {
            return `
					padding-left: ${getIndentation()}rpx;
				`;
          }
        };
      });
      const getIndentation = () => {
        const indentationSize = data.type == "quadrants" ? 18 : 28;
        return data.indent * indentationSize;
      };
      const hasChildren = (item) => {
        return item.children && item.children.length > 0;
      };
      const nameStyle = vue.computed(() => {
        const size = data.type == "quadrants" ? 20 : 28;
        if (data.displayMode) {
          return `
				-webkit-line-clamp: 1;
				font-size: ${size}rpx;
			`;
        }
        return `
			font-size: ${size}rpx;
		`;
      });
      const toggleExpand = (index) => {
        data.list[index].expanded = !data.list[index].expanded;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "recursive-menu-wrap" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(data.list, (item, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: "cell",
                  key: index,
                  style: vue.normalizeStyle(vue.unref(cellStyle)(item))
                },
                [
                  item.isTop ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "pinned"
                  }, [
                    vue.createElementVNode("view", { class: "pinned-left" }, [
                      vue.createElementVNode("image", {
                        class: "pinned-img",
                        src: "/static/images/index/pinned.png"
                      }),
                      vue.createElementVNode("text", { class: "pinned-text" }, "置顶")
                    ]),
                    hasChildren(item) ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "pinned-right"
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "num" },
                        vue.toDisplayString(item.children.length + 1),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass(["iconfont pinned-action-icon", item.expanded ? "icon-a-Group2028" : "icon-a-Group35752"])
                        },
                        null,
                        2
                        /* CLASS */
                      )
                    ])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  data.type == "quadrants" && item.children && item.children.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "quadrants-box"
                  }, [
                    item.directoryName ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "quadrants-directory-name"
                      },
                      vue.toDisplayString(item.directoryName),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true),
                    item.directoryName ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                      vue.createElementVNode(
                        "text",
                        { class: "num" },
                        vue.toDisplayString(item.children.length),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("text", {
                        class: vue.normalizeClass(["iconfont icons", item.expanded ? "icon-a-Group2028" : "icon-a-Group35752"]),
                        onClick: ($event) => toggleExpand(index)
                      }, null, 10, ["onClick"])
                    ])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true),
                  item.name ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "item"
                  }, [
                    vue.createElementVNode("view", { class: "item-left" }, [
                      vue.createElementVNode("label", { class: "label" }, [
                        vue.createElementVNode("checkbox-group", null, [
                          vue.createElementVNode("checkbox", {
                            value: "agreement",
                            color: "#ED4C46",
                            style: { "transform": "scale(0.6)" }
                          })
                        ])
                      ])
                    ]),
                    vue.createElementVNode(
                      "view",
                      {
                        class: "item-right",
                        style: vue.normalizeStyle(data.type == "quadrants" ? "margin-top: 10rpx;" : "")
                      },
                      [
                        vue.createElementVNode("view", { class: "item-right-content" }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: "item-right-name",
                              style: vue.normalizeStyle(vue.unref(nameStyle))
                            },
                            vue.toDisplayString(item.name),
                            5
                            /* TEXT, STYLE */
                          ),
                          hasChildren(item) ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "collapse"
                          }, [
                            vue.createElementVNode(
                              "text",
                              { class: "num" },
                              vue.toDisplayString(item.children.length + 1),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("text", {
                              class: vue.normalizeClass(["iconfont icons", item.expanded ? "icon-changyong_shouqi" : "icon-changyong_zhankai"]),
                              onClick: ($event) => toggleExpand(index)
                            }, null, 10, ["onClick"])
                          ])) : vue.createCommentVNode("v-if", true)
                        ]),
                        item.info && data.displayMode == false ? (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 0,
                            class: "item-right-info"
                          },
                          vue.toDisplayString(item.info),
                          1
                          /* TEXT */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode("view", { class: "item-bottom" }, [
                          vue.createElementVNode("view", { class: "item-bottom-left" }, [
                            vue.createElementVNode(
                              "text",
                              {
                                class: "tips",
                                style: vue.normalizeStyle(vue.unref(dataStyle)(item))
                              },
                              vue.toDisplayString(item.tips),
                              5
                              /* TEXT, STYLE */
                            )
                          ]),
                          item.directoryName && data.type != "quadrants" ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "item-bottom-right"
                          }, [
                            vue.createElementVNode(
                              "text",
                              { class: "directory-cion" },
                              vue.toDisplayString(item.directoryIcon),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "text",
                              { class: "directory-name" },
                              vue.toDisplayString(item.directoryName),
                              1
                              /* TEXT */
                            )
                          ])) : vue.createCommentVNode("v-if", true)
                        ])
                      ],
                      4
                      /* STYLE */
                    )
                  ])) : vue.createCommentVNode("v-if", true),
                  item.children && item.children.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 3 }, [
                    item.expanded ? (vue.openBlock(), vue.createBlock(vue.unref(lzRecursiveMenu), {
                      key: 0,
                      "display-mode": data.displayMode,
                      list: item.children,
                      indent: item.name ? data.indent + 1 : data.indent,
                      type: data.type
                    }, null, 8, ["display-mode", "list", "indent", "type"])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true)
                ],
                4
                /* STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });
  const lzRecursiveMenu = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-60f7fd86"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-recursive-menu/lz-recursive-menu.vue"]]);
  const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-nav-left-menus",
    setup(__props, { expose }) {
      const popup = vue.ref();
      const show = (x, y) => {
        popup.value.show(x, y);
      };
      expose({
        show
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(
          lzPopup,
          {
            ref_key: "popup",
            ref: popup,
            "body-width": 496,
            "body-height": 882
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popup" })
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  });
  const lzNavLeftMenus = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-486a0cbd"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/index/cpn/lz-nav-left-menus.vue"]]);
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-progress-bar",
    props: {
      initialPercentage: { type: Number, required: false, default: 0 },
      activeBackgroundColor: { type: String, required: false, default: "da594e" },
      mode: { type: String, required: false, default: "center" }
    },
    setup(__props) {
      const data = __props;
      const percentage = vue.ref(data.initialPercentage);
      const startUpdate = () => {
        const updateInterval = setInterval(() => {
          percentage.value += 10;
          if (percentage.value >= 100) {
            percentage.value = 100;
            clearInterval(updateInterval);
            uni.reLaunch({
              url: "/pages/tabBar/habitBuildingSystem/index/index"
            });
          }
        }, 500);
      };
      const progressStyle = vue.computed(() => {
        return `
			 width: ${percentage.value}%;
			 background: ${data.activeBackgroundColor};
		`;
      });
      vue.onMounted(() => {
        startUpdate();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "percentage-progress-bar" }, [
          vue.createElementVNode("view", { class: "progress-bar" }, [
            percentage.value >= 10 ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "progress",
                style: vue.normalizeStyle(vue.unref(progressStyle))
              },
              [
                percentage.value >= 10 && data.mode == "center" ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  { key: 0 },
                  vue.toDisplayString(percentage.value) + "%",
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ]),
          percentage.value >= 10 && data.mode == "bottom" ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "txt"
            },
            "加载中: " + vue.toDisplayString(percentage.value) + "%",
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const lzProgress = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-95c8ad89"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-progress-bar/lz-progress-bar.vue"]]);
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-todo",
    props: {
      type: { type: String, required: false, default: "info" }
    },
    setup(__props, { expose }) {
      const data = __props;
      const popup = vue.ref();
      const bodyHeight = vue.computed(() => {
        let height = 0;
        if (updateStatus.value) {
          height = 852;
        }
        if (updateStatus.value == false) {
          height = data.type == "update" ? 892 : 872;
        }
        return height;
      });
      const headerH = vue.computed(() => {
        const height = data.type == "info" ? 260 : 226;
        return height;
      });
      const show = () => {
        popup.value.show();
      };
      const btnText = vue.computed(() => {
        return data.type == "update" ? "立即更新" : "同意并使用";
      });
      const text = vue.computed(() => {
        return data.type == "update" ? "暂不更新" : "不同意并退出";
      });
      let updateStatus = vue.ref(false);
      const btnClick = () => {
        if (data.type == "update") {
          updateStatus.value = true;
        }
      };
      expose({
        show
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(lzPopup, {
          ref_key: "popup",
          ref: popup,
          "body-width": 640,
          "body-height": vue.unref(bodyHeight),
          center: "",
          "header-h": vue.unref(headerH),
          "mask-color": "",
          "is-header": "",
          "is-footer": "",
          footerH: 192
        }, {
          header: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "popup-header" }, [
              vue.createElementVNode("text", { class: "popup-header-title" }, "感谢使用Todo计划"),
              vue.createElementVNode("image", {
                class: "popup-header-logo",
                src: "/static/images/common/logo.png"
              })
            ])
          ]),
          footer: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "popup-bottom" }, [
              vue.unref(updateStatus) == false ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createElementVNode("view", {
                    class: "popup-bottom-btn",
                    onClick: btnClick
                  }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(vue.unref(btnText)),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "popup-bottom-txt" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(vue.unref(text)),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true),
              vue.unref(updateStatus) ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  vue.createElementVNode("view", { class: "progress" }, [
                    vue.createVNode(lzProgress, { "initial-percentage": 20 })
                  ]),
                  vue.createElementVNode("view", { class: "update-text" }, [
                    vue.createElementVNode("text", null, "新版本正在努力更新中，请稍后")
                  ])
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "popup-content" }, [
              data.type != "info" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "version"
              }, [
                vue.createElementVNode("text", null, "V1.0.2")
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("text", null, "感谢您使用「Todo计划」，我们非常重视您的 个人信息和隐私保护。在您使用「Todo计划」服 务之前，请仔细阅读"),
              vue.createElementVNode("text", { class: "agreement" }, "《用户隐私政策》"),
              vue.createElementVNode("text", null, "和"),
              vue.createElementVNode("text", { class: "agreement" }, "《用户服务协议》"),
              vue.createTextVNode(" 的全部内容同意并接受全部条款 后开始我们的产品和服务。 "),
              vue.createElementVNode("text", { class: "popup-content-bottom" }, "如您同意此政策，请点击“同意”并开始我们 的产品和服务。")
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["body-height", "header-h"]);
      };
    }
  });
  const lzTodo = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-a021bf29"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-todo/lz-todo.vue"]]);
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-importance-level",
    setup(__props, { expose }) {
      const list = [
        {
          title: "非常重要",
          icon: "/static/images/index/level-1.png",
          isRightIcon: false
        },
        {
          title: "比较重要",
          icon: "/static/images/index/level-2.png",
          isRightIcon: false
        },
        {
          title: "一般重要",
          icon: "/static/images/index/level-3.png",
          isRightIcon: false
        },
        {
          title: "不重要",
          icon: "/static/images/index/level-4.png",
          isRightIcon: false
        }
      ];
      const popup = vue.ref();
      const show = () => {
        popup.value.show();
      };
      const leftIconStyle = {
        width: "28rpx",
        height: "28rpx"
      };
      expose({
        show
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(
          lzPopup,
          {
            ref_key: "popup",
            ref: popup,
            title: "重要程度",
            "body-width": 600,
            "body-height": 498,
            "header-h": 122,
            "mask-color": "",
            "is-header": "",
            center: "",
            "left-icon": "",
            "right-icon": ""
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popup-content" }, [
                vue.createVNode(lzFeatureList, {
                  data: list,
                  height: 90,
                  "margin-top": "0",
                  "left-icon-style": leftIconStyle
                })
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  });
  const lzImportanceLevel = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-07654c5c"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/index/cpn/lz-importance-level.vue"]]);
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const pinnedList = [
        {
          name: "别睡懒觉",
          info: "别睡懒觉！别睡懒觉！千万别睡懒觉！重要的事情",
          tips: "今天 本周五 09:00",
          directoryIcon: "icon",
          directoryName: "伟大的计划😊",
          isTop: true,
          expanded: true
        }
      ];
      const list = vue.reactive([
        {
          name: "2.制作薄脆",
          tips: "今天 本周五 09:40",
          expanded: true,
          directoryIcon: "icon",
          directoryName: "伟大的计划😊",
          type: "parent",
          info: "data3",
          children: [
            {
              name: "1.面粉加盐，打入鸡蛋、食用油，搅拌成光 滑面团，醒5分钟，21.面粉加盐，打入鸡蛋、食用油，搅拌成光 滑面团，醒5分钟",
              data: "面团略微光滑，油放多了",
              tips: "今天 09:40~09:50 过期1小时",
              type: "parent",
              expanded: false,
              info: "data4",
              children: [
                {
                  name: "1-2.制作薄脆",
                  tips: "今天 本周五 09:40",
                  expanded: false,
                  directoryIcon: "icon",
                  directoryName: "伟大的计划😊",
                  type: "parent",
                  info: "data5"
                }
              ]
            },
            {
              name: "2.醒好的面团压平，切成小块矩形状面块",
              data: "切不开，面团黏在一起",
              tips: "今天 09:50~10:00 过期51分钟",
              type: "child",
              expanded: false,
              info: "data6"
            },
            {
              name: "3.烧油，待到油温7成热，面块下锅油炸， 炸至金黄香脆",
              data: "炸成了实心，变成了炸馒头",
              tips: "今天 10:00~10:15 过期36分钟",
              type: "child",
              expanded: false,
              info: "data7"
            }
          ]
        }
      ]);
      let displayMode = vue.ref(uni.getStorageSync("display-mode") || false);
      const menus = vue.reactive([
        {
          icon: "",
          name: "任务排序",
          event: "taskSorting"
        },
        {
          icon: displayMode.value ? "" : "",
          name: displayMode.value ? "详细显示" : "简洁显示",
          mode: displayMode.value || false,
          event: "change"
        },
        {
          icon: "",
          name: "隐藏已完成"
        },
        {
          icon: "",
          name: "批量编辑"
        }
      ]);
      const popupBodyHeight = vue.computed(() => {
        const H = menus.length * 80;
        return H;
      });
      const popup = vue.ref();
      const navRightIcon = () => {
        popup.value.show(uni.upx2px(460), navHeight + uni.upx2px(20));
      };
      let selectIconRef = vue.ref(null);
      let taskSortingRef = vue.ref(null);
      let createListRef = vue.ref(null);
      let navLeftMenusRef = vue.ref(null);
      let todoRef = vue.ref(null);
      let importanceLevelRef = vue.ref(null);
      const navLeftIcon = () => {
        navLeftMenusRef.value.show(uni.upx2px(30), navHeight + uni.upx2px(20));
      };
      const handleMenus = (item, index) => {
        if (item.event == "taskSorting") {
          taskSortingRef.value.show();
        }
        if (item.event == "change") {
          item.mode = !item.mode;
          item.name = item.mode ? "详细显示" : "简洁显示";
          item.icon = item.mode ? "" : "";
          displayMode.value = item.mode;
          uni.setStorageSync("display-mode", displayMode.value);
        }
        popup.value.hide();
      };
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "index-wrap" }, [
              vue.createVNode(lzNavBar, {
                "is-back": false,
                "left-icon": "",
                "left-icon-color": "#db584e",
                rightIcon: "",
                leftText: "收集箱",
                onRightIcon: navRightIcon,
                onLeftIcon: navLeftIcon
              }),
              vue.createElementVNode(
                "view",
                {
                  class: "index-content",
                  style: vue.normalizeStyle(vue.unref(contentStyle))
                },
                [
                  vue.createElementVNode("view", { class: "list-content" }, [
                    vue.createElementVNode("view", { class: "pinned-list" }, [
                      vue.createVNode(lzRecursiveMenu, {
                        "display-mode": vue.unref(displayMode),
                        list: pinnedList
                      }, null, 8, ["display-mode"])
                    ]),
                    vue.createElementVNode("view", { class: "list" }, [
                      vue.createVNode(lzRecursiveMenu, {
                        "display-mode": vue.unref(displayMode),
                        list
                      }, null, 8, ["display-mode", "list"])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "bottom-action" }, [
                    vue.createElementVNode("view", { class: "bottom-action-item" }, [
                      vue.createElementVNode("text", { class: "iconfont icon-a-Group1972" })
                    ]),
                    vue.createElementVNode("view", { class: "bottom-action-item" }, [
                      vue.createElementVNode("text", { class: "iconfont icon-a-Group2003" })
                    ])
                  ]),
                  vue.createVNode(lzTabBar, { current: 0 })
                ],
                4
                /* STYLE */
              ),
              vue.createCommentVNode(' 	<lz-empty\r\n			center\r\n			:width="300" \r\n			:height="300" \r\n			img="/static/images/empty/list.png" \r\n			text="当前暂无任务"\r\n			info="快点击“+”按钮添加任务吧"\r\n		>\r\n		</lz-empty> ')
            ]),
            vue.createVNode(lzPopup, {
              ref_key: "popup",
              ref: popup,
              "body-width": 260,
              "body-height": vue.unref(popupBodyHeight)
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: "popup-menus-wrap",
                    style: vue.normalizeStyle("height:" + vue.unref(popupBodyHeight) + "rpx;")
                  },
                  [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(menus, (item, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "popup-menus-item",
                          "hover-class": "menus-hover",
                          key: index,
                          onClick: ($event) => handleMenus(item)
                        }, [
                          vue.createElementVNode(
                            "text",
                            { class: "iconfont menus-icon" },
                            vue.toDisplayString(item.icon),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "menus-name" },
                            vue.toDisplayString(item.name),
                            1
                            /* TEXT */
                          )
                        ], 8, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  4
                  /* STYLE */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["body-height"]),
            vue.createCommentVNode(" 清单=新建清单-选择图标popup "),
            vue.createVNode(
              lzSelectIcon,
              {
                ref_key: "selectIconRef",
                ref: selectIconRef
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createCommentVNode(" 任务排序popup "),
            vue.createVNode(
              lzTaskSorting,
              {
                ref_key: "taskSortingRef",
                ref: taskSortingRef
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createCommentVNode(" 新建清单popup "),
            vue.createVNode(
              lzCreateList,
              {
                ref_key: "createListRef",
                ref: createListRef
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createCommentVNode(" nav-left popup "),
            vue.createVNode(
              lzNavLeftMenus,
              {
                ref_key: "navLeftMenusRef",
                ref: navLeftMenusRef
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createCommentVNode(" 应用更新popup "),
            vue.createVNode(
              lzTodo,
              {
                ref_key: "todoRef",
                ref: todoRef,
                type: "update"
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createCommentVNode(" 批量编辑-重要程度 "),
            vue.createVNode(
              lzImportanceLevel,
              {
                ref_key: "importanceLevelRef",
                ref: importanceLevelRef
              },
              null,
              512
              /* NEED_PATCH */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesTabBarIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-036b8cf8"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/index/index.vue"]]);
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    __name: "email-content-popup",
    setup(__props, { expose }) {
      const data = vue.reactive({
        content: `<p>尊敬的贝吉塔王子</p><p>您好，关于测试期间遇到的砍树、卡顿问题已恢复正常。给您带来了不便非常抱歉。收下岛务厅为您准备的礼物。</p>`,
        list: [
          {
            url: "/static/images/habitBuildingSystem/footprint.png"
          },
          {
            url: "/static/images/habitBuildingSystem/footprint.png"
          },
          {
            url: "/static/images/habitBuildingSystem/footprint.png"
          },
          {
            url: "/static/images/habitBuildingSystem/footprint.png"
          }
        ]
      });
      let type = "text";
      const centerStyle = {
        backgroundImage: "url('/static/images/habitBuildingSystem/title-box.png')",
        width: "297.62rpx",
        height: "59.52rpx",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "32rpx",
        fontFamily: "江城圆体-500W, 江城圆体",
        fontWeight: "normal",
        color: "#72695B"
      };
      const popupFooterStyle = vue.computed(() => {
      });
      const popup = vue.ref();
      const show = () => {
        popup.value.show();
      };
      const hide = () => {
        popup.value.hide();
      };
      expose({
        show
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(lzPopup, {
          ref_key: "popup",
          ref: popup,
          title: "卡顿问题补偿",
          "body-width": 650.79,
          "body-height": 1035.71,
          center: "",
          "mask-color": "",
          "is-header": "",
          "header-h": 138.88,
          "is-footer": "",
          "footer-h": vue.unref(type) == "text" ? 198.41 : 353.17,
          "bg-color": "#F5E4D2",
          "center-style": centerStyle,
          "right-icon": ""
        }, {
          top: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "popup-close-box",
              onClick: hide
            }, [
              vue.createElementVNode("image", {
                class: "popup-close-img",
                src: "/static/images/habitBuildingSystem/close.png"
              })
            ])
          ]),
          footer: vue.withCtx(() => [
            vue.createElementVNode(
              "view",
              {
                class: "popup-footer",
                style: vue.normalizeStyle(vue.unref(popupFooterStyle))
              },
              [
                vue.unref(type) == "text" ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  class: "footprint-img",
                  src: "/static/images/habitBuildingSystem/footprint.png"
                })) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createElementVNode("scroll-view", {
                      class: "scroll",
                      "scroll-x": ""
                    }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(data.list, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "scroll-item",
                            key: index
                          }, [
                            vue.createElementVNode("image", {
                              class: "scroll-item-img",
                              src: item.url
                            }, null, 8, ["src"])
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    vue.createElementVNode("view", { class: "btn-box" }, [
                      vue.createElementVNode("view", { class: "btn-content" }, [
                        vue.createElementVNode("text", null, "领取")
                      ])
                    ])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ],
              4
              /* STYLE */
            )
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "popup-center" }, [
              vue.createElementVNode("view", {
                innerHTML: data.content
              }, null, 8, ["innerHTML"])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["body-width", "body-height", "header-h", "footer-h"]);
      };
    }
  });
  const emailContentPopup = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-51fe4304"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/habitBuildingSystem/cpn/email-content-popup.vue"]]);
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "email-list-popup",
    setup(__props, { expose }) {
      let emailIcon = "/static/images/habitBuildingSystem/owl.png";
      const list = vue.reactive([
        {
          read: false,
          content: "学校每日新闻",
          date: "2022/08/19 09:47"
        },
        {
          content: "学校每周总结",
          date: "2022/08/19 09:47"
        },
        {
          content: "学校每周总结",
          date: "2022/08/19 09:47"
        },
        {
          content: "学校每周总结",
          date: "2022/08/19 09:47"
        },
        {
          content: "学校每周总结",
          date: "2022/08/19 09:47"
        }
      ]);
      const centerStyle = {
        backgroundImage: "url('/static/images/habitBuildingSystem/title-box.png')",
        width: "297.62rpx",
        height: "59.52rpx",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "32rpx",
        fontFamily: "江城圆体-500W, 江城圆体",
        fontWeight: "normal",
        color: "#72695B"
      };
      let emailContentPopupRef = vue.ref(null);
      const popup = vue.ref();
      const handleTapCell = (item) => {
        hide();
        setTimeout(() => {
          emailContentPopupRef.value.show();
        }, 180);
      };
      const show = () => {
        popup.value.show();
      };
      const hide = () => {
        popup.value.hide();
      };
      expose({
        show
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createVNode(lzPopup, {
              ref_key: "popup",
              ref: popup,
              title: "邮件",
              "body-width": 650.79,
              "body-height": 1073.41,
              center: "",
              "mask-color": "",
              "is-header": "",
              "header-h": 138.88,
              "is-footer": "",
              "footer-h": 101.19,
              "bg-color": "#F5E4D2",
              "center-style": centerStyle,
              "right-icon": ""
            }, {
              top: vue.withCtx(() => [
                vue.createElementVNode("view", {
                  class: "popup-close-box",
                  onClick: hide
                }, [
                  vue.createElementVNode("image", {
                    class: "popup-close-img",
                    src: "/static/images/habitBuildingSystem/close.png"
                  })
                ])
              ]),
              footer: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "popup-footer" }, " 仅显示最近20封邮件 ")
              ]),
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "popup-center" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(list, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "item",
                        key: index
                      }, [
                        vue.createElementVNode("view", { class: "item-left" }, [
                          vue.createElementVNode("image", {
                            class: "img",
                            src: vue.unref(emailIcon)
                          }, null, 8, ["src"])
                        ]),
                        vue.createElementVNode("view", {
                          class: "item-right",
                          onClick: ($event) => handleTapCell()
                        }, [
                          item.read == false ? (vue.openBlock(), vue.createElementBlock("image", {
                            key: 0,
                            class: "item-right-txt",
                            src: "/static/images/habitBuildingSystem/not-read-txt.png"
                          })) : vue.createCommentVNode("v-if", true),
                          vue.createElementVNode(
                            "text",
                            { class: "content-title" },
                            vue.toDisplayString(item.content),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("view", { class: "content-time" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "content-time-txt" },
                              vue.toDisplayString(item.date.split(" ")[0]),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "text",
                              { class: "content-time-txt" },
                              vue.toDisplayString(item.date.split(" ")[1]),
                              1
                              /* TEXT */
                            )
                          ])
                        ], 8, ["onClick"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["body-width", "body-height", "header-h", "footer-h"]),
            vue.createCommentVNode(" 邮箱内容 "),
            vue.createVNode(
              emailContentPopup,
              {
                ref_key: "emailContentPopupRef",
                ref: emailContentPopupRef
              },
              null,
              512
              /* NEED_PATCH */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const emailListPopup = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-4d98a7d6"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/habitBuildingSystem/cpn/email-list-popup.vue"]]);
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    __name: "personal-Info-popup",
    emits: ["click"],
    setup(__props, { expose, emit }) {
      const popup = vue.ref();
      const show = () => {
        popup.value.show();
      };
      const hide = () => {
        popup.value.hide();
      };
      const showModifyNamePopup = () => {
        emit("click");
      };
      expose({
        show,
        hide
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(lzPopup, {
          ref_key: "popup",
          ref: popup,
          title: "",
          "body-width": 634.92,
          "body-height": 371.03,
          center: "",
          "mask-color": "",
          "bg-color": "#FAF5F2",
          "right-icon": ""
        }, {
          top: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "popup-close-box",
              onClick: hide
            }, [
              vue.createElementVNode("image", {
                class: "popup-close-img",
                src: "/static/images/habitBuildingSystem/close.png"
              })
            ])
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "popup-content" }, [
              vue.createElementVNode("view", { class: "popup-content-left" }, [
                vue.createElementVNode("image", {
                  class: "img",
                  src: "/static/images/habitBuildingSystem/corgi.png"
                })
              ]),
              vue.createElementVNode("view", { class: "popup-content-right" }, [
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createElementVNode("text", null, "姓名：江远"),
                  vue.createElementVNode("view", {
                    class: "edit-icon",
                    onClick: showModifyNamePopup
                  }, [
                    vue.createElementVNode("text", { class: "iconfont icon-yangchengxitong-bianji" })
                  ])
                ]),
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createElementVNode("text", null, "性别：男")
                ]),
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createElementVNode("text", null, "形态：幼态")
                ]),
                vue.createElementVNode("view", { class: "bottom-action" }, [
                  vue.createElementVNode("view", { class: "bottom-action-btn" }, [
                    vue.createElementVNode("text", null, "饥恶")
                  ]),
                  vue.createElementVNode("view", { class: "bottom-action-btn" }, [
                    vue.createElementVNode("text", null, "生病")
                  ])
                ])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["body-width", "body-height"]);
      };
    }
  });
  const personalInfoPopup = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-d5515ff2"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/habitBuildingSystem/cpn/personal-Info-popup.vue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    __name: "modify-name-popup",
    setup(__props, { expose }) {
      const popup = vue.ref();
      const show = () => {
        popup.value.show();
      };
      const bgImage = "/static/images/habitBuildingSystem/btn-active.png";
      const hide = () => {
        popup.value.hide();
      };
      const centerStyle = {
        width: "100%",
        fontSize: "32rpx",
        fontFamily: "江城圆体-500W, 江城圆体",
        fontWeight: "normal",
        color: "#72695B",
        textAlign: "center"
      };
      expose({
        show,
        hide
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(lzPopup, {
          ref_key: "popup",
          ref: popup,
          title: "名称修改",
          "is-header": "",
          "body-width": 634.92,
          "body-height": 396.83,
          "header-h": 95.21,
          center: "",
          "mask-color": "",
          "bg-color": "#FAF5F2",
          "right-icon": "",
          centerStyle
        }, {
          top: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "popup-close-box",
              onClick: hide
            }, [
              vue.createElementVNode("image", {
                class: "popup-close-img",
                src: "/static/images/habitBuildingSystem/close.png"
              })
            ])
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "popup-content" }, [
              vue.createElementVNode("view", { class: "popup-content-plc" }),
              vue.createElementVNode("view", { class: "body" }, [
                vue.createElementVNode("view", { class: "input-box" }, [
                  vue.createElementVNode("input", {
                    class: "body-input",
                    maxlength: 5,
                    value: "犀利的托尼"
                  })
                ]),
                vue.createElementVNode("text", { class: "body-desc" }, "修改名称需要消耗1张改名卡"),
                vue.createElementVNode("view", { class: "botton-action" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "btn",
                      style: vue.normalizeStyle({ "background-image": `url(${bgImage})` })
                    },
                    [
                      vue.createElementVNode("text", { class: "btn-txt" }, "修改")
                    ],
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode("view", { class: "name-change-card" }, [
                    vue.createElementVNode("image", {
                      class: "card-img",
                      src: "/static/images/habitBuildingSystem/name-change-card.png"
                    }),
                    vue.createElementVNode("text", { class: "num" }, "×1")
                  ])
                ])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["body-width", "body-height", "header-h"]);
      };
    }
  });
  const modifyNamePopup = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-466130b1"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/habitBuildingSystem/cpn/modify-name-popup.vue"]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "adopt-popup",
    setup(__props, { expose }) {
      const popup = vue.ref();
      const show = () => {
        popup.value.show();
      };
      const bgImage = "/static/images/habitBuildingSystem/btn-active.png";
      const hide = () => {
        popup.value.hide();
      };
      const centerStyle = {
        width: "100%",
        fontSize: "32rpx",
        fontFamily: "江城圆体-500W, 江城圆体",
        fontWeight: "normal",
        color: "#72695B",
        textAlign: "center"
      };
      expose({
        show,
        hide
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(lzPopup, {
          ref_key: "popup",
          ref: popup,
          title: "领养",
          "is-header": "",
          "body-width": 634.92,
          "body-height": 555.56,
          "header-h": 99.21,
          center: "",
          "mask-color": "",
          "bg-color": "#FAF5F2",
          "right-icon": "",
          centerStyle
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "popup-content" }, [
              vue.createElementVNode("view", { class: "popup-content-plc" }),
              vue.createElementVNode("view", { class: "body" }, [
                vue.createElementVNode("image", {
                  class: "body-img",
                  src: "/static/images/habitBuildingSystem/corgi.png"
                }),
                vue.createElementVNode("text", { class: "body-desc" }, "快去领养一只新的小动物吧~"),
                vue.createElementVNode(
                  "view",
                  {
                    class: "btn",
                    style: vue.normalizeStyle({ "background-image": `url(${bgImage})` })
                  },
                  [
                    vue.createElementVNode("text", { class: "btn-txt" }, "去领养")
                  ],
                  4
                  /* STYLE */
                )
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["body-width", "body-height", "header-h"]);
      };
    }
  });
  const adoptPopup = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-d55eccdc"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/habitBuildingSystem/cpn/adopt-popup.vue"]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const rightBottomMenus = [
        {
          id: 1,
          url: "/static/images/habitBuildingSystem/fangshou.png"
        },
        {
          id: 2,
          url: "/static/images/habitBuildingSystem/sunsiwanhui.png"
        },
        {
          id: 3,
          url: "/static/images/habitBuildingSystem/youjian.png"
        },
        {
          id: 4,
          url: "/static/images/habitBuildingSystem/bujizhan.png"
        },
        {
          id: 5,
          url: "/static/images/habitBuildingSystem/shangdian.png"
        },
        {
          id: 6,
          url: "/static/images/habitBuildingSystem/beibao.png"
        }
      ];
      const personalInfoPopupRef = vue.ref(null);
      const showPersonalInfoPopup = () => {
        personalInfoPopupRef.value.show();
      };
      const modifyNamePopupRef = vue.ref(null);
      const showModifyNamePopup = () => {
        personalInfoPopupRef.value.hide();
        modifyNamePopupRef.value.show();
      };
      const handleTapExitImg = () => {
        uni.reLaunch({
          url: "/pages/tabBar/habitBuildingSystem/main"
        });
      };
      const emailListPopupRef = vue.ref(null);
      const handleRigtBottomMenus = (id) => {
        switch (id) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            emailListPopupRef.value.show();
            break;
        }
      };
      const adoptPopupRef = vue.ref(null);
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "wrap" }, [
              vue.createElementVNode("view", { class: "content" }, [
                vue.createElementVNode("view", { class: "header-container" }, [
                  vue.createElementVNode("view", {
                    class: "left",
                    onClick: showPersonalInfoPopup
                  })
                ]),
                vue.createElementVNode("view", {
                  class: "exit-box",
                  onClick: handleTapExitImg
                }, [
                  vue.createElementVNode("image", {
                    class: "exit-img",
                    src: "/static/images/habitBuildingSystem/exit.png"
                  })
                ]),
                vue.createElementVNode("view", { class: "right-bottom-menus" }, [
                  (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(rightBottomMenus, (item) => {
                      return vue.createElementVNode("view", {
                        class: "bottom-menus-item",
                        key: item.id,
                        onClick: ($event) => handleRigtBottomMenus(item.id)
                      }, [
                        vue.createElementVNode("image", {
                          class: "bottom-menus-img",
                          src: item.url
                        }, null, 8, ["src"])
                      ], 8, ["onClick"]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ])
              ])
            ]),
            vue.createCommentVNode(" 以下为各个功能模块的弹窗 "),
            vue.createCommentVNode(" 领养 "),
            vue.createVNode(
              adoptPopup,
              {
                ref_key: "adoptPopupRef",
                ref: adoptPopupRef
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createCommentVNode(" 邮箱列表 "),
            vue.createVNode(
              emailListPopup,
              {
                ref_key: "emailListPopupRef",
                ref: emailListPopupRef
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createCommentVNode(" 个人信息 "),
            vue.createVNode(
              personalInfoPopup,
              {
                ref_key: "personalInfoPopupRef",
                ref: personalInfoPopupRef,
                onClick: showModifyNamePopup
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createCommentVNode(" 名称修改 "),
            vue.createVNode(
              modifyNamePopup,
              {
                ref_key: "modifyNamePopupRef",
                ref: modifyNamePopupRef
              },
              null,
              512
              /* NEED_PATCH */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesTabBarHabitBuildingSystemIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-4de09e22"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/habitBuildingSystem/index/index.vue"]]);
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "personalInformationDetails",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const basicInformation = [
        {
          title: "头像",
          value: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJwAnAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAgMEBQcBAAj/xAA2EAACAQMEAQMCBAMIAwEAAAABAgMABBEFEiExQQZRYRMiBxQycUKBkSOhscHR4fDxFRZSNP/EABgBAAMBAQAAAAAAAAAAAAAAAAABAwIE/8QAIREBAQEBAQACAgIDAAAAAAAAAAECEQMhMRJBBBMiUWH/2gAMAwEAAhEDEQA/ABTjFINdWvOKC5HU6p1KbjHFOqDnmkOJEGamRDmo0I4pu51O3slJmbBB5HtSNabecUorhaE7f1fEL4xyL/YMcBvaizeHQFOQRnNARXBzTZ5FSGGKYkyaARZtib6QPO7Kr7g1dW8mVEckZMijvP8AeaouUnjkHYOPg1dKx3JJg4def8jXJuc06cXsSIg2SWU5zjA7Geq84Jb7iTt7p2ATuPu3YPJ2qPux4+K8wy2w4LnPA9qzK1YrLglUZDwMZGaFLxT+akO7s5/2oqvVJYtuVWxjnxQ5qAQXBKHg8njir4val6RHUVIiALVHBqRF3mrIpIApwAUwmSakqvFAQcY6rhNPnB8U0QM04C42A7panLCmhTkfdHCO3EqwWryMduAcVnmpX0lzOzuxPj+VF3quYxWCopwWNAr8tTgcLZrUPSt5+c0K3did6Axt+4/2xWXAZ6rSPwu0jVdQhuIoLZ/y5YMsjcKD0f8AKlTXpweqZMbNkIpY+wFaHpfoWJRm8cyk9heAKtv/AF+ztObeCNSe8DusBkTW07xP/YyYHOdp8VKtGZ4wR0ADt7OPNG+rwAQuBxjjOKBLJPpS7QCShIOPYGo+i3mILIuoXGcgZ5HJrskBjDEDAH3J549q7aOxcO+7HuRz/wAFS5YxKuNxBHY/+gaj1ZQ3SIJFY4ywwT3j3oZ1VCJFDfIBPH8qK79PoW5kCliHwce3vQ5rJWX6UgGTk8nyPFVxU9xVolSokwKREuWqSBjiulzuLhadVximezXaA4RxTYxn7s08O6Q6c8UfIcGPFLXsUhRinIxlqfQovWADfRGQCKEmXOSoJUdt4oj9XOTfKngLRJ+E3oN/U9zJd3/1I7CBhnA4kPtTvwEf8M/w6u/U1zHe3J+lp0b/AHkjl/gV9H6VpVrplmlpZxCOJBjAp6ztLextUt7WJYooxhVUYAp4OKyHcbeqj3SblqSTTE36TQAvqdtuLZ66rO9QiEGszqAD96nb/LP+tafqe0A+KznXQf8AzTuBw8akeOQaj6T4U87/AJH7WQNA+xf0YIx2M1YWriW2KkAMoJGT2KqbZWTYqhiT9+B5HkftVjaKyhjngHIx2a53QiXDAxsHDE45Oe8UK65GsSDHBjfBXrj3/pRlcQCUs6AgZ4FC3qe1/M28jRA4ePaBjz0K3j7Y39B7/wArZwSbGnj3dHBzVlFLHKoaN1YH2OazWaNoZHjcYZDtIqbo93Lb3AEYLZ4AzwPmuvjmH6ICeKVsbxXLc/YC3ZFObqXQZr3ivKDil44rVBCjNLQANXhXgcNSCFd6Dd61rljBYIzyTOFO1eFXySfavovQ9Lt9G0q3sbZVEcSAcDs+TQV+GWkPufUpVwuNkbe/vR7K5Q4yq54y3mgPSzAZwQcU1HPl8FSB81E1W9tdMsZ72ZtsMC73KCsgsfxYvtX9UWtnbxpBYyy7FRU3OxJwMnPFLl6bcjKCMjxSWG4ZPVN24AQZYZ/anpGAUnx7mmQb1nILMP2z4rPdewNWi2kkmMqST4J4o59R3ywwyM7ge28/5VkSa1HqF00+4NskIGO/+cVL0+ms/YmgnKhUxhUPOOyKn2lwqRhWbBU5yeeKq4biN443YsW/Yf8ADS/ujY/HkDkCubjqWRkY7gMYbjI8Cq66iWQGLJbcSKlmRWjwibWHn3qDMszE/TQnPOc04Wvpkfqiz/I6zcQ7dozuUfH/AHmq61LCePZ+osK0L1lo0mo235iKJ/zUA6K/rXyP5UFaXZSNfWzSqUjZ8hiMA/FdmdSxzanKO7bcIUDd4GTTnFeUcfb1STmhkrgV0HNIamLy7js4Glk8dVsJQNSdKtVvNRggckK7gMR7UDTeqJDIfpx/bVz6S9bQ6fqST30eUTkADzSD6YsYoLGzit7ePZFGuAKg6zfxWtu8rNwqk8+KyLTfxR1/W/UUNppdspsi337k5C+ST4o49S6qZtGucGMvsOOOOqnrUnxW841Z2Rj3rr1ld6rLLa2lxMsH6WUHg89fNPfhB6Wn1z1RHdMojtrDEsj9nd/Co+Tyf5UJPFcTX4t4YWkuZJMCJFyST4rb/S+t+mfQmijRjqUMuqFt948J3ASkcrn46qsnww0i/mWGNFB2+5z1SQzsm113oAMMDWdv630u4fM18oTJwScY/c9UUaZq1vNbAQTpImMAo4I/xrHL0dQ/Vdq09hc/lmH1djYyOjXz76cEkcl7BKpEy7WIbsEE5/xFbprV7GY5TuI7HvmsfvrZYPUkkibhHdQMTx0R/wBUtcspwR6NOskW0jnA7+KuIpWztZwpYY4NBmnytHIq84HBz4zRTE25cggsORkcGuSunFTgwBwhyT70qO4OSDgfB6NIgZVIJBwfcUshCwx4ztNLrddeVS25kXHgHqqe80eCbLWqqpzkpjAzVtEglYL2ex8fFK+gNpGdpxW86sT1mUNlDGSjAqw7Bpskg9Vb30IYlXwHX9L+9VByCR7V0TXULnhJwOTQn6rvUkYW6NnaeaIdVm+haySew4rPpnaWVpGJJY5qrJuuivYqVplt+bv4LfIH1JApJ67oAg9Keo7rQg8cVgJVlI3NyGx8GtasHOoaf9RkaJZE5AbkVI0/Q9Nj06KIRRu6Dk9Bf51ZW0AVApVADyqqK4/XM1rrr8f5GvPNz+lL6L9B2VgLvV5UD3Eu5bb6gJ2Hrd/vWKalZ3ui380d3C8MyMVdH7/f567r6QvtZtbXT2inlROMcHGKy/1gk+q2+2a1kmjC7o3MR3AfB7xXRm/Dmvbes1GoXTxGCInBOW9z8Va+n7rXba9/K6ddzxyzEbo0bdnns+2BS9J06KMLK9nJI2cYlyoH8qKrK8lEf0HMUEfRWNAqt/StXZfiuLqeaSA7vuJ7O7mh3U4lP0pdwZomyf281a3V0tvFn7WG3gZ7qmm1S1uj9FoyjeCPFcvp+Vvw6fDWJmzSGZfpsdnIzkj3oj0u9Uw5fkdc+/8ApQgQ0dyTF9yHgh/A+Kn2dxiNYz0fis3PEs3lGX5gblyR1gjvmlKH3kkg7T171UWtyGUFt32gAcdVd2l0ty+5owmFKj5/el9LS9Jicxy/xAHJx5FS2ljIV8nfn7sn+lJWMFSUbPBHWf60owkoCVA3cdd0dNAvWypMfOes1WyQhmyDxirl7cA4UcgZA+KhmHk4LKB4qmdMayGdbiaWwdV9qAGBU4PYrVL+1MErQvkxkZRj/EKBdc0eSCVpoV3RnkgeK6peuZSDg5pUcjJIrgkEHPFJII7GK5TDefRmv2t9YR7sBkUZQt1+9X8Woh7gkKMnIUZ/5xXzppmpXGmzrNbvgq2ceCfmiq29dOZIzMjI2RllPA+ajrz+T6L/AFLp76x6jsrNnZrW4uEEqg/wjvPjxWozzxSKzfTGEBx9vWOBWOr6ntpLy1uIpAyxsDx3Wi2vq/Q9kcQuF3zdZ6B9ifFW8LMzlVzzifLYWMiotzbRuwUdrWF/iPqUP/s80Okj6cNsojbbwC/mtS9WeqbHTLSSUTo87D+xQMPuNYddp9Ri7fczkszeSSef76fpqfot3k4WfUFz9AIfubzupm1vHPjzwT4qLMsaNg9ikrNsGAKncxPq/hkbcPu75/epf1B9bOMY4IzQ4l/KABhcCpNvqTbVVzx81O+dEoqhuXBBycDkg/4VeadcoBgc4AAB5zxzQna3C3Ef1YiDt4bBq402TDbUGe+CfNRs+eKzQvtJUb6iAEMRkEHinYydm1z92eDns1UWlwNg34DAYOKlRSk7Vzz3keT71jivYkFiCyE980ztB/VgftXcbuc55yc1xjhiOaZdRNWgkaNQoJRD0f4c1SOitlJACPajOQoJpFlXKsMY96H9VsDExmi+9PcVbz3+kt5v2CfUen20MX1Yhh2PQFDmwA80UeppCqKCe+aGGO5sCuqfSD3088qOK8ISfgeTTirkbc813GRhV/vo4ZpyQMgnPj4qTDqs0cJhf+0Xxu8VHZeeAab+mc1myGeNyzNnBLfJ6pJnkKkZIHjFeVQvnmvEc0fiXTLZLZPdepwrSGBph0DNdPAroHFc2kmkEzTLh7ebIJ2nseMUXWjgBXQnjoig2NdozV7oV4v/AOeTgeDUvXEs6JRV9YnY3WTyAamRXJwBxx5qoSQwrtI+1uj5pwTbcbeM81CLSiH8yRjgY+KRJcB2zioNs4kXBNde4ijbaSa1+Ma6K5Ut3BIyM+DVbcxKjEA7kP61bsUhtVt+ckHI8nqoI1OL6uRIrr/8nsVmStWgr1lps0E/148m3bpvb4NCy47Y1r14sV5bsjKPpuOQfIrONc0iSxmLL90RPB9q6fPf+0N558qoNydvXzS8lhyw/YUggYry49jmq9TdKtmu44rwB8k14d0g5t4roBIxSgM15zjqjoJKZNJ2880sEnoV45pdMjbSkA3V0ClrjzTKlEA9VyImKQMp5Fd46FeAoAt0+4F1a/cfuA96SZsfaTyKoNOuzbSgE/ae6tpz9T748c8/Arm1nlbl+FnBOchc90xeTMZz91V8NxtbaTyPmk3MhaZjmhrogu9rSFRxgdVG+i3DdD3pV3GskTFxnHVUc+5RgO+Pbcac+Ds78iS2vgMxbgwHGPFduo47iMrMu5DVBp47Az4omiUPa5bxj/DNIf8AAJrOlvZS7ohuiPIaqse5NaBLDHNuikGUPiqK90m1ilKoGA9s1XO/0nZyqAYFdVSzdcVdz6bbxhdu45Hk1GkgjQYUeO610uIBXmno7bfzipFvBHuHFXdvbRGMfbUfT04v4+X5UOvb7BnFJSHcaJjawn+Gki0hVjhBU/7rxf8AonVB+UJHCmkmxl8Kf6UTRxr1gU7sUeKzPetb8IGrbTZ3P3Jx81YJpQXl2zVsvdJuDisa9tWnn+PM5VE+mwspUblY9MKYtZZIma1lP3L+n5qxVi020niot/GrW5k/jTlW8iujN7PlxbnKaYEnikFm96XGdwBPkZpt/wBRFaif0//Z",
          type: "img"
        },
        {
          title: "昵称",
          value: "正在战斗的乌龟123456"
        },
        {
          title: "会员",
          value: "普通用户"
        }
      ];
      const accountInformation = [
        {
          title: "邮箱",
          value: "codelz@163.com"
        },
        {
          title: "修改密码",
          isRightIcon: false,
          url: "/pages/accountManagement/changeAndRecoverPassword/changeAndRecoverPassword?type=3"
        }
      ];
      const popup = vue.ref();
      const toAccountDeletion = () => {
        uni.navigateTo({
          url: "/pages/accountManagement/accountDeletion/accountDeletion?type=4"
        });
        popup.value.hide();
      };
      const navRightIcon = () => {
        popup.value.show(240, navHeight + 10);
      };
      const handleCell = (item) => {
        if (item.url) {
          uni.navigateTo({
            url: item.url
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "about-wrap" }, [
              vue.createVNode(lzNavBar, {
                "left-icon": "",
                rightIcon: "",
                leftText: "个人中心",
                onRightIcon: navRightIcon
              }),
              vue.createElementVNode(
                "view",
                {
                  class: "about-content",
                  style: vue.normalizeStyle(vue.unref(contentStyle))
                },
                [
                  vue.createVNode(lzFeatureList, { data: basicInformation }),
                  vue.createVNode(lzFeatureList, {
                    data: accountInformation,
                    onClick: handleCell
                  }),
                  vue.createElementVNode("button", { class: "btn" }, "退出登录")
                ],
                4
                /* STYLE */
              )
            ]),
            vue.createVNode(
              lzPopup,
              {
                ref_key: "popup",
                ref: popup,
                bodyWidth: 258,
                bodyHeight: 76
              },
              {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "popup-content",
                    onClick: toAccountDeletion
                  }, [
                    vue.createElementVNode("image", {
                      class: "popup-content-img",
                      src: "/static/images/common/logout.png"
                    }),
                    vue.createElementVNode("text", { class: "popup-content-text" }, "注销账号")
                  ])
                ]),
                _: 1
                /* STABLE */
              },
              512
              /* NEED_PATCH */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesAccountManagementPersonalInformationDetailsPersonalInformationDetails = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-05ddd21b"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/accountManagement/personalInformationDetails/personalInformationDetails.vue"]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "audioAndAlertSettings",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const list = [
        {
          title: "完成提示音",
          type: "popup"
        },
        {
          title: "提示铃声",
          type: "popup"
        },
        {
          title: "提示震动",
          value: false,
          type: "switch",
          isRightIcon: false,
          label: "开启后，提醒持续2分钟"
        }
      ];
      const notice = [
        {
          title: "提示未生效？",
          icon: "/static/images/common/notice_warning.png",
          url: "/pages/audioAndAlertSettings/completionSound/completionSound"
        }
      ];
      const popup = vue.ref();
      const handleCell = (item) => {
        if (item.type == "popup") {
          popup.value.show();
        }
        if (item.url) {
          uni.navigateTo({
            url: item.url
          });
        }
      };
      let radioCurrent = vue.ref(-1);
      const radioList = [
        {
          value: "dd",
          name: "叮咚"
        },
        {
          value: "fg",
          name: "复古"
        },
        {
          value: "kh",
          name: "科幻"
        },
        {
          value: "wu",
          name: "无"
        }
      ];
      const radioChange = (e) => {
      };
      const switchChange = (value) => {
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "about-wrap" }, [
              vue.createVNode(lzNavBar, {
                "left-icon": "",
                leftText: "个人中心"
              }),
              vue.createElementVNode(
                "view",
                {
                  class: "about-content",
                  style: vue.normalizeStyle(vue.unref(contentStyle))
                },
                [
                  vue.createVNode(lzFeatureList, {
                    data: list,
                    onClick: handleCell,
                    onSwitchChange: switchChange
                  }),
                  vue.createVNode(lzFeatureList, {
                    data: notice,
                    onClick: handleCell
                  })
                ],
                4
                /* STYLE */
              )
            ]),
            vue.createVNode(
              lzPopup,
              {
                ref_key: "popup",
                ref: popup,
                title: "完成提示音",
                "is-header": "",
                "header-h": 122,
                maskColor: "",
                bodyWidth: 590,
                bodyHeight: 520,
                center: "",
                "left-icon": "",
                "right-icon": "",
                "is-footer": "",
                "footer-h": 96
              },
              {
                footer: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "popup-bottom-action" }, [
                    vue.createElementVNode("text", null, "取消")
                  ]),
                  vue.createElementVNode("view", { class: "popup-bottom-action" }, [
                    vue.createElementVNode("text", null, "确定")
                  ])
                ]),
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "popup-content" }, [
                    vue.createElementVNode(
                      "radio-group",
                      { onChange: radioChange },
                      [
                        (vue.openBlock(), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(radioList, (item, index) => {
                            return vue.createElementVNode("label", {
                              class: "cell",
                              key: item.value
                            }, [
                              vue.createElementVNode("view", null, [
                                vue.createElementVNode("radio", {
                                  value: item.value,
                                  checked: index === vue.unref(radioCurrent),
                                  style: { "transform": "scale(0.6)" }
                                }, null, 8, ["value", "checked"])
                              ]),
                              vue.createElementVNode(
                                "view",
                                { class: "radio-name" },
                                vue.toDisplayString(item.name),
                                1
                                /* TEXT */
                              )
                            ]);
                          }),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ]),
                _: 1
                /* STABLE */
              },
              512
              /* NEED_PATCH */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesAudioAndAlertSettingsAudioAndAlertSettings = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-eb7ec33b"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/audioAndAlertSettings/audioAndAlertSettings.vue"]]);
  var calendar = {
    /**
     * 农历1900-2100的润大小信息表
     * @Array Of Property
     * @return Hex
     */
    lunarInfo: [
      19416,
      19168,
      42352,
      21717,
      53856,
      55632,
      91476,
      22176,
      39632,
      21970,
      //1900-1909
      19168,
      42422,
      42192,
      53840,
      119381,
      46400,
      54944,
      44450,
      38320,
      84343,
      //1910-1919
      18800,
      42160,
      46261,
      27216,
      27968,
      109396,
      11104,
      38256,
      21234,
      18800,
      //1920-1929
      25958,
      54432,
      59984,
      92821,
      23248,
      11104,
      100067,
      37600,
      116951,
      51536,
      //1930-1939
      54432,
      120998,
      46416,
      22176,
      107956,
      9680,
      37584,
      53938,
      43344,
      46423,
      //1940-1949
      27808,
      46416,
      86869,
      19872,
      42416,
      83315,
      21168,
      43432,
      59728,
      27296,
      //1950-1959
      44710,
      43856,
      19296,
      43748,
      42352,
      21088,
      62051,
      55632,
      23383,
      22176,
      //1960-1969
      38608,
      19925,
      19152,
      42192,
      54484,
      53840,
      54616,
      46400,
      46752,
      103846,
      //1970-1979
      38320,
      18864,
      43380,
      42160,
      45690,
      27216,
      27968,
      44870,
      43872,
      38256,
      //1980-1989
      19189,
      18800,
      25776,
      29859,
      59984,
      27480,
      23232,
      43872,
      38613,
      37600,
      //1990-1999
      51552,
      55636,
      54432,
      55888,
      30034,
      22176,
      43959,
      9680,
      37584,
      51893,
      //2000-2009
      43344,
      46240,
      47780,
      44368,
      21977,
      19360,
      42416,
      86390,
      21168,
      43312,
      //2010-2019
      31060,
      27296,
      44368,
      23378,
      19296,
      42726,
      42208,
      53856,
      60005,
      54576,
      //2020-2029
      23200,
      30371,
      38608,
      19195,
      19152,
      42192,
      118966,
      53840,
      54560,
      56645,
      //2030-2039
      46496,
      22224,
      21938,
      18864,
      42359,
      42160,
      43600,
      111189,
      27936,
      44448,
      //2040-2049
      /**Add By JJonline@JJonline.Cn**/
      84835,
      37744,
      18936,
      18800,
      25776,
      92326,
      59984,
      27424,
      108228,
      43744,
      //2050-2059
      37600,
      53987,
      51552,
      54615,
      54432,
      55888,
      23893,
      22176,
      42704,
      21972,
      //2060-2069
      21200,
      43448,
      43344,
      46240,
      46758,
      44368,
      21920,
      43940,
      42416,
      21168,
      //2070-2079
      45683,
      26928,
      29495,
      27296,
      44368,
      84821,
      19296,
      42352,
      21732,
      53600,
      //2080-2089
      59752,
      54560,
      55968,
      92838,
      22224,
      19168,
      43476,
      41680,
      53584,
      62034,
      //2090-2099
      54560
    ],
    //2100
    /**
     * 公历每个月份的天数普通表
     * @Array Of Property
     * @return Number
     */
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /**
     * 天干地支之天干速查表
     * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
     * @return Cn string
     */
    Gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    /**
     * 天干地支之地支速查表
     * @Array Of Property
     * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
     * @return Cn string
     */
    Zhi: [
      "子",
      "丑",
      "寅",
      "卯",
      "辰",
      "巳",
      "午",
      "未",
      "申",
      "酉",
      "戌",
      "亥"
    ],
    /**
     * 天干地支之地支速查表<=>生肖
     * @Array Of Property
     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
     * @return Cn string
     */
    Animals: [
      "鼠",
      "牛",
      "虎",
      "兔",
      "龙",
      "蛇",
      "马",
      "羊",
      "猴",
      "鸡",
      "狗",
      "猪"
    ],
    /**
     * 阳历节日
     */
    festival: {
      "1-1": {
        title: "元旦"
      },
      "2-14": {
        title: "情人节"
      },
      "3-8": {
        title: "妇女节"
      },
      "3-12": {
        title: "植树节"
      },
      "4-1": {
        title: "愚人节"
      },
      "4-5": {
        title: "清明节"
      },
      "5-1": {
        title: "劳动节"
      },
      "5-4": {
        title: "青年节"
      },
      "5-12": {
        title: "护士节"
      },
      "6-1": {
        title: "儿童节"
      },
      "7-1": {
        title: "建党节"
      },
      "8-1": {
        title: "建军节"
      },
      "9-10": {
        title: "教师节"
      },
      "10-1": {
        title: "国庆节"
      },
      "12-24": {
        title: "平安夜"
      },
      "12-25": {
        title: "圣诞节"
      }
    },
    /**
     * 农历节日
     */
    lfestival: {
      "12-30": {
        title: "除夕"
      },
      "1-1": {
        title: "春节"
      },
      "1-15": {
        title: "元宵节"
      },
      "2-2": {
        title: "龙抬头"
      },
      "5-5": {
        title: "端午节"
      },
      "7-7": {
        title: "七夕节"
      },
      "7-15": {
        title: "中元节"
      },
      "8-15": {
        title: "中秋节"
      },
      "9-9": {
        title: "重阳节"
      },
      "10-1": {
        title: "寒衣节"
      },
      "10-15": {
        title: "下元节"
      },
      "12-8": {
        title: "腊八节"
      },
      "12-23": {
        title: "北方小年"
      },
      "12-24": {
        title: "南方小年"
      }
    },
    /**
     * 返回默认定义的阳历节日
     */
    getFestival() {
      return this.festival;
    },
    /**
     * 返回默认定义的内容里节日
     */
    getLunarFestival() {
      return this.lfestival;
    },
    /**
     * 
     * @param {Object} 按照festival的格式输入数据，设置阳历节日
     */
    setFestival(param = {}) {
      this.festival = param;
    },
    /**
     * 
     * @param {Object} 按照lfestival的格式输入数据，设置农历节日
     */
    setLunarFestival(param = {}) {
      this.lfestival = param;
    },
    /**
     * 24节气速查表
     * @Array Of Property
     * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
     * @return Cn string
     */
    solarTerm: [
      "小寒",
      "大寒",
      "立春",
      "雨水",
      "惊蛰",
      "春分",
      "清明",
      "谷雨",
      "立夏",
      "小满",
      "芒种",
      "夏至",
      "小暑",
      "大暑",
      "立秋",
      "处暑",
      "白露",
      "秋分",
      "寒露",
      "霜降",
      "立冬",
      "小雪",
      "大雪",
      "冬至"
    ],
    /**
     * 1900-2100各年的24节气日期速查表
     * @Array Of Property
     * @return 0x string For splice
     */
    sTermInfo: [
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "9778397bd19801ec9210c965cc920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd09801d98082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd197c36c9210c9274c91aa",
      "97b6b97bd19801ec95f8c965cc920e",
      "97bd09801d98082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec95f8c965cc920e",
      "97bcf97c3598082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd07f595b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "9778397bd19801ec9210c9274c920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd07f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd07f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bd07f1487f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c9274c920e",
      "97bcf7f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c91aa",
      "97b6b97bd197c36c9210c9274c920e",
      "97bcf7f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c920e",
      "97b6b7f0e47f531b0723b0b6fb0722",
      "7f0e37f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36b0b70c9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0787b0721",
      "7f0e27f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c91aa",
      "97b6b7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "977837f0e37f149b0723b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f5307f595b0b0bc920fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "977837f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0723b06bd",
      "7f07e7f0e37f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0723b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0723b06bd",
      "7f07e7f0e37f14998083b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14898082b0723b02d5",
      "7f07e7f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e36665b66aa89801e9808297c35",
      "665f67f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e36665b66a449801e9808297c35",
      "665f67f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e36665b66a449801e9808297c35",
      "665f67f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e26665b66a449801e9808297c35",
      "665f67f0e37f1489801eb072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722"
    ],
    /**
     * 数字转中文速查表
     * @Array Of Property
     * @trans ['日','一','二','三','四','五','六','七','八','九','十']
     * @return Cn string
     */
    nStr1: [
      "日",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十"
    ],
    /**
     * 日期转农历称呼速查表
     * @Array Of Property
     * @trans ['初','十','廿','卅']
     * @return Cn string
     */
    nStr2: ["初", "十", "廿", "卅"],
    /**
     * 月份转农历称呼速查表
     * @Array Of Property
     * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
     * @return Cn string
     */
    nStr3: [
      "正",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
      "冬",
      "腊"
    ],
    /**
     * 返回农历y年一整年的总天数
     * @param lunar Year
     * @return Number
     * @eg:var count = calendar.lYearDays(1987) ;//count=387
     */
    lYearDays: function(y) {
      var i, sum = 348;
      for (i = 32768; i > 8; i >>= 1) {
        sum += this.lunarInfo[y - 1900] & i ? 1 : 0;
      }
      return sum + this.leapDays(y);
    },
    /**
     * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
     * @param lunar Year
     * @return Number (0-12)
     * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
     */
    leapMonth: function(y) {
      return this.lunarInfo[y - 1900] & 15;
    },
    /**
     * 返回农历y年闰月的天数 若该年没有闰月则返回0
     * @param lunar Year
     * @return Number (0、29、30)
     * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
     */
    leapDays: function(y) {
      if (this.leapMonth(y)) {
        return this.lunarInfo[y - 1900] & 65536 ? 30 : 29;
      }
      return 0;
    },
    /**
     * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
     * @param lunar Year
     * @return Number (-1、29、30)
     * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
     */
    monthDays: function(y, m) {
      if (m > 12 || m < 1) {
        return -1;
      }
      return this.lunarInfo[y - 1900] & 65536 >> m ? 30 : 29;
    },
    /**
     * 返回公历(!)y年m月的天数
     * @param solar Year
     * @return Number (-1、28、29、30、31)
     * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
     */
    solarDays: function(y, m) {
      if (m > 12 || m < 1) {
        return -1;
      }
      var ms = m - 1;
      if (ms == 1) {
        return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
      } else {
        return this.solarMonth[ms];
      }
    },
    /**
     * 农历年份转换为干支纪年
     * @param  lYear 农历年的年份数
     * @return Cn string
     */
    toGanZhiYear: function(lYear) {
      var ganKey = (lYear - 3) % 10;
      var zhiKey = (lYear - 3) % 12;
      if (ganKey == 0)
        ganKey = 10;
      if (zhiKey == 0)
        zhiKey = 12;
      return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
    },
    /**
     * 公历月、日判断所属星座
     * @param  cMonth [description]
     * @param  cDay [description]
     * @return Cn string
     */
    toAstro: function(cMonth, cDay) {
      var s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
      var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "座";
    },
    /**
     * 传入offset偏移量返回干支
     * @param offset 相对甲子的偏移量
     * @return Cn string
     */
    toGanZhi: function(offset) {
      return this.Gan[offset % 10] + this.Zhi[offset % 12];
    },
    /**
     * 传入公历(!)y年获得该年第n个节气的公历日期
     * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
     * @return day Number
     * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
     */
    getTerm: function(y, n) {
      if (y < 1900 || y > 2100) {
        return -1;
      }
      if (n < 1 || n > 24) {
        return -1;
      }
      var _table = this.sTermInfo[y - 1900];
      var _info = [
        parseInt("0x" + _table.substr(0, 5)).toString(),
        parseInt("0x" + _table.substr(5, 5)).toString(),
        parseInt("0x" + _table.substr(10, 5)).toString(),
        parseInt("0x" + _table.substr(15, 5)).toString(),
        parseInt("0x" + _table.substr(20, 5)).toString(),
        parseInt("0x" + _table.substr(25, 5)).toString()
      ];
      var _calday = [
        _info[0].substr(0, 1),
        _info[0].substr(1, 2),
        _info[0].substr(3, 1),
        _info[0].substr(4, 2),
        _info[1].substr(0, 1),
        _info[1].substr(1, 2),
        _info[1].substr(3, 1),
        _info[1].substr(4, 2),
        _info[2].substr(0, 1),
        _info[2].substr(1, 2),
        _info[2].substr(3, 1),
        _info[2].substr(4, 2),
        _info[3].substr(0, 1),
        _info[3].substr(1, 2),
        _info[3].substr(3, 1),
        _info[3].substr(4, 2),
        _info[4].substr(0, 1),
        _info[4].substr(1, 2),
        _info[4].substr(3, 1),
        _info[4].substr(4, 2),
        _info[5].substr(0, 1),
        _info[5].substr(1, 2),
        _info[5].substr(3, 1),
        _info[5].substr(4, 2)
      ];
      return parseInt(_calday[n - 1]);
    },
    /**
     * 传入农历数字月份返回汉语通俗表示法
     * @param lunar month
     * @return Cn string
     * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
     */
    toChinaMonth: function(m) {
      if (m > 12 || m < 1) {
        return -1;
      }
      var s = this.nStr3[m - 1];
      s += "月";
      return s;
    },
    /**
     * 传入农历日期数字返回汉字表示法
     * @param lunar day
     * @return Cn string
     * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
     */
    toChinaDay: function(d) {
      var s;
      switch (d) {
        case 10:
          s = "初十";
          break;
        case 20:
          s = "二十";
          break;
        case 30:
          s = "三十";
          break;
        default:
          s = this.nStr2[Math.floor(d / 10)];
          s += this.nStr1[d % 10];
      }
      return s;
    },
    /**
     * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
     * @param y year
     * @return Cn string
     * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
     */
    getAnimal: function(y) {
      return this.Animals[(y - 4) % 12];
    },
    /**
     * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
     * @param y  solar year
     * @param m  solar month
     * @param d  solar day
     * @return JSON object
     * @eg:__f__('log','at utils/calendar.js:545',calendar.solar2lunar(1987,11,01));
     */
    solar2lunar: function(y, m, d) {
      y = parseInt(y);
      m = parseInt(m);
      d = parseInt(d);
      if (y < 1900 || y > 2100) {
        return -1;
      }
      if (y == 1900 && m == 1 && d < 31) {
        return -1;
      }
      if (!y) {
        var objDate = /* @__PURE__ */ new Date();
      } else {
        var objDate = new Date(y, parseInt(m) - 1, d);
      }
      var i, leap = 0, temp = 0;
      var y = objDate.getFullYear(), m = objDate.getMonth() + 1, d = objDate.getDate();
      var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(
        1900,
        0,
        31
      )) / 864e5;
      for (i = 1900; i < 2101 && offset > 0; i++) {
        temp = this.lYearDays(i);
        offset -= temp;
      }
      if (offset < 0) {
        offset += temp;
        i--;
      }
      var isTodayObj = /* @__PURE__ */ new Date();
      if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d)
        ;
      var nWeek = objDate.getDay();
      this.nStr1[nWeek];
      if (nWeek == 0) {
        nWeek = 7;
      }
      var year = i;
      var leap = this.leapMonth(i);
      var isLeap = false;
      for (i = 1; i < 13 && offset > 0; i++) {
        if (leap > 0 && i == leap + 1 && isLeap == false) {
          --i;
          isLeap = true;
          temp = this.leapDays(year);
        } else {
          temp = this.monthDays(year, i);
        }
        if (isLeap == true && i == leap + 1) {
          isLeap = false;
        }
        offset -= temp;
      }
      if (offset == 0 && leap > 0 && i == leap + 1) {
        if (isLeap) {
          isLeap = false;
        } else {
          isLeap = true;
          --i;
        }
      }
      if (offset < 0) {
        offset += temp;
        --i;
      }
      var month = i;
      var day = offset + 1;
      var sm = m - 1;
      var gzY = this.toGanZhiYear(year);
      var firstNode = this.getTerm(y, m * 2 - 1);
      var secondNode = this.getTerm(y, m * 2);
      var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
      if (d >= firstNode) {
        gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
      }
      var Term = null;
      if (firstNode == d) {
        Term = this.solarTerm[m * 2 - 2];
      }
      if (secondNode == d) {
        Term = this.solarTerm[m * 2 - 1];
      }
      var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10;
      var gzD = this.toGanZhi(dayCyclical + d - 1);
      var astro = this.toAstro(m, d);
      var festival = this.festival;
      var lfestival = this.lfestival;
      var festivalDate = m + "-" + d;
      var lunarFestivalDate = month + "-" + day;
      return {
        // date: solarDate,
        // lunarDate: lunarDate,
        festival: festival[festivalDate] ? festival[festivalDate].title : null,
        lunarFestival: lfestival[lunarFestivalDate] ? lfestival[lunarFestivalDate].title : null,
        "lYear": year,
        "lMonth": month,
        "lDay": day,
        "Animal": this.getAnimal(year),
        "IMonthCn": (isLeap ? "闰" : "") + this.toChinaMonth(month),
        "IDayCn": this.toChinaDay(day),
        // 'cYear': y,
        // 'cMonth': m,
        // 'cDay': d,
        "gzYear": gzY,
        "gzMonth": gzM,
        "gzDay": gzD,
        // 'isToday': isToday,
        // 'isLeap': isLeap,
        // 'nWeek': nWeek,
        // 'ncWeek': "\u661f\u671f" + cWeek,
        // 'isTerm': isTerm,
        "Term": Term,
        "astro": astro
      };
    },
    /**
     * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
     * @param y  lunar year
     * @param m  lunar month
     * @param d  lunar day
     * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
     * @return JSON object
     * @eg:__f__('log','at utils/calendar.js:709',calendar.lunar2solar(1987,9,10));
     */
    lunar2solar: function(y, m, d, isLeapMonth) {
      y = parseInt(y);
      m = parseInt(m);
      d = parseInt(d);
      var isLeapMonth = !!isLeapMonth;
      var leapMonth = this.leapMonth(y);
      this.leapDays(y);
      if (isLeapMonth && leapMonth != m) {
        return -1;
      }
      if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
        return -1;
      }
      var day = this.monthDays(y, m);
      var _day = day;
      if (isLeapMonth) {
        _day = this.leapDays(y, m);
      }
      if (y < 1900 || y > 2100 || d > _day) {
        return -1;
      }
      var offset = 0;
      for (var i = 1900; i < y; i++) {
        offset += this.lYearDays(i);
      }
      var leap = 0, isAdd = false;
      for (var i = 1; i < m; i++) {
        leap = this.leapMonth(y);
        if (!isAdd) {
          if (leap <= i && leap > 0) {
            offset += this.leapDays(y);
            isAdd = true;
          }
        }
        offset += this.monthDays(y, i);
      }
      if (isLeapMonth) {
        offset += day;
      }
      var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
      var calObj = new Date((offset + d - 31) * 864e5 + stmap);
      var cY = calObj.getUTCFullYear();
      var cM = calObj.getUTCMonth() + 1;
      var cD = calObj.getUTCDate();
      return this.solar2lunar(cY, cM, cD);
    }
  };
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-calendar",
    props: {
      showLunar: { type: Boolean, required: false, default: false },
      showMonthBg: { type: Boolean, required: false, default: true },
      showChangeBtn: { type: Boolean, required: false, default: true },
      firstDayOfWeek: { type: String, required: false, default: "sunday" },
      weekType: { type: String, required: false, default: "周" },
      weekend: { type: Boolean, required: false, default: true },
      showShrink: { type: Boolean, required: false, default: false },
      shrinkState: { type: String, required: false, default: "month" },
      signList: { type: Array, required: false, default: () => [] }
    },
    emits: ["dayChange", "monthChange", "shrinkClick", "swiperChange"],
    setup(__props, { expose, emit }) {
      const props = __props;
      const data = vue.reactive({
        weekArr: ["日", "一", "二", "三", "四", "五", "六"],
        today: {
          year: 0,
          month: 0,
          day: 0
        },
        selDate: {
          year: 0,
          month: 0,
          day: 0
        },
        allMonthList: [],
        tranIndex: 1,
        allWeekList: [],
        tranCurrent: 1,
        tranDuration: 300,
        signArr: props.signList,
        showToday: false,
        shrinkType: false,
        deterChange: true
      });
      const create = () => {
        let nd = /* @__PURE__ */ new Date();
        data.today = {
          year: nd.getFullYear(),
          month: nd.getMonth() + 1,
          day: nd.getDate()
        };
        if (props.firstDayOfWeek == "monday") {
          data.weekArr = ["一", "二", "三", "四", "五", "六", "日"];
        }
        initDate();
      };
      const getAllData = vue.computed(() => {
        return data.shrinkType ? data.allWeekList : data.allMonthList;
      });
      const getIsSelDay = vue.computed(() => {
        return function(d) {
          let { year, month, day } = data.selDate;
          return year == d.year && month == d.month && day == d.day;
        };
      });
      const initDate = () => {
        data.selDate = JSON.parse(JSON.stringify(data.today));
        let monthList = getMonthData(data.selDate);
        let prevMonthList = getMonthData(getMonthDate(data.selDate, -1));
        let nextMonthList = getMonthData(getMonthDate(data.selDate));
        data.allMonthList = [prevMonthList, monthList, nextMonthList];
        data.tranIndex = 1;
        if (props.shrinkState == "week" && !data.shrinkType)
          changeShrink();
      };
      const getMonthData = (date) => {
        const { year, month, day } = date;
        let maxDay = new Date(year, month, 0).getDate();
        let firstWeek = (/* @__PURE__ */ new Date(year + "/" + month + "/1")).getDay();
        if (props.firstDayOfWeek == "monday")
          firstWeek = firstWeek - 1 < 0 ? 6 : firstWeek - 1;
        let list = [];
        for (var i = 0; i < 42; i++) {
          let dayInfo = {};
          if (i < firstWeek) {
            let { year: year2, month: month2 } = getMonthDate(date, -1);
            let preMaxDay = new Date(year2, month2, 0).getDate();
            let day2 = preMaxDay - firstWeek + i + 1;
            dayInfo = getDayInfo({ year: year2, month: month2, day: day2 }, "prev");
          } else if (i > maxDay + firstWeek - 1) {
            let { year: year2, month: month2 } = getMonthDate(date);
            let day2 = i - maxDay - firstWeek + 1;
            dayInfo = getDayInfo({ year: year2, month: month2, day: day2 }, "next");
          } else {
            let day2 = i - firstWeek + 1;
            dayInfo = getDayInfo({ year, month, day: day2 }, "normal");
          }
          if (i % 7 == 0)
            list.push(new Array());
          list[list.length - 1].push(dayInfo);
        }
        return list;
      };
      const getDayInfo = (date, dayType) => {
        const { year, month, day } = date;
        let isToday = false;
        if (year == data.today.year && month == data.today.month && day == data.today.day)
          isToday = true;
        let week = (/* @__PURE__ */ new Date(year + "/" + month + "/" + day)).getDay();
        let lunar = calendar.solar2lunar(year, month, day);
        let dayLunar = lunar.IDayCn == "初一" ? lunar.IMonthCn + lunar.IDayCn : lunar.IDayCn;
        if (lunar.festival)
          dayLunar = lunar.festival;
        else if (lunar.lunarFestival)
          dayLunar = lunar.lunarFestival;
        else if (lunar.Term)
          dayLunar = lunar.Term;
        let holidayArr = [
          "元旦",
          "情人节",
          "妇女节",
          "植树节",
          "愚人节",
          "清明节",
          "劳动节",
          "青年节",
          "护士节",
          "儿童节",
          "建党节",
          "建军节",
          "教师节",
          "国庆节",
          "平安夜",
          "圣诞节",
          "除夕",
          "春节",
          "元宵节",
          "龙抬头",
          "端午节",
          "七夕节",
          "中元节",
          "中秋节",
          "重阳节",
          "寒衣节",
          "下元节",
          "腊八节",
          "北方小年",
          "南方小年"
        ];
        let isHoliday = false;
        if (holidayArr.indexOf(dayLunar) != -1)
          isHoliday = true;
        let dayInfo = {
          date: year + "-" + month + "-" + day,
          year,
          month,
          day,
          week,
          lunar,
          // 农历
          dayLunar,
          // 显示的农历
          isToday,
          // 是否是今日
          isHoliday,
          // 是否是节假日
          dayType,
          // 日期类型，上月、下月或当前月
          sign: getSignByDate(date)
        };
        let dayClass = getDayClass(dayInfo);
        dayInfo["dayClass"] = dayClass;
        return dayInfo;
      };
      const getDayClass = (dayInfo) => {
        let dClass = "";
        if (dayInfo.isToday)
          dClass += " is-today";
        if (dayInfo.isHoliday)
          dClass += " is-holiday";
        if (props.weekend && (dayInfo.week == 0 || dayInfo.week == 6))
          dClass += " week-end";
        return dClass;
      };
      const getSignByDate = (date) => {
        const { year, month, day } = date;
        let dayDateS = (/* @__PURE__ */ new Date(year + "/" + month + "/" + day + " 00:00:00")).getTime();
        let dayDateE = (/* @__PURE__ */ new Date(year + "/" + month + "/" + day + " 23:59:59")).getTime();
        let daySign = [];
        data.signArr.map((sign) => {
          sign.date.replace(/-/g, "/");
          let signTimes = new Date(sign.date).getTime();
          if (signTimes >= dayDateS && signTimes <= dayDateE)
            daySign.push(sign);
        });
        return daySign;
      };
      const getOtherData = (type) => {
        let nowMont = getMonthDate(data.selDate, type == "prev" ? -1 : 1);
        data.selDate = nowMont;
        let monthData = getMonthData(getMonthDate(nowMont, type == "prev" ? -1 : 1));
        let current = getTranIndex().prevNum;
        if (type == "next")
          current = getTranIndex().nextNum;
        data.allMonthList.splice(current, 1, monthData);
        judgeShowToday();
        returnMonthChange(type);
      };
      const getOtherWeekData = (type) => {
        let oldSel = data.selDate;
        let newSel = getDateByDateAndDay(oldSel, type == "prev" ? -7 : 7);
        if (oldSel.month != newSel.month) {
          let current = getTranIndex("month").prevNum;
          if (type == "next")
            current = getTranIndex("month").nextNum;
          data.tranIndex = current;
          getOtherData(type);
        }
        data.selDate = newSel;
        getWeekData(type);
        judgeShowToday();
      };
      const getWeekData = (type) => {
        const { prevNum: prevIndex, nowNum: nowIndex, nextNum: nextIndex } = getTranIndex("month");
        const { prevNum: prevCurrent, nowNum: nowCurrent, nextNum: nextCurrent } = getTranIndex("week");
        const { year: selYear, month: selMonth, day: selDay } = data.selDate;
        let sDate = selYear + "-" + selMonth + "-" + selDay;
        let prevMonthList = data.allMonthList[prevIndex];
        let nowMonthList = data.allMonthList[nowIndex];
        let nextMonthList = data.allMonthList[nextIndex];
        for (let i = 0; i < nowMonthList.length; i++) {
          for (let j = 0; j < nowMonthList[i].length; j++) {
            if (sDate == nowMonthList[i][j].date) {
              returnDayChange(nowMonthList[i][j]);
              if (type == "next") {
                data.allWeekList.splice(nextCurrent, 1, [nowMonthList[i + 1]]);
                if (i == 5)
                  data.allWeekList.splice(nextCurrent, 1, [nextMonthList[1]]);
              } else {
                data.allWeekList.splice(prevCurrent, 1, [nowMonthList[i - 1]]);
                if (i == 0) {
                  for (let k = prevMonthList.length - 1; k >= 0; k--) {
                    if (prevMonthList[k][6].dayType == "normal") {
                      data.allWeekList.splice(prevCurrent, 1, [prevMonthList[k]]);
                      break;
                    }
                  }
                }
              }
              break;
            }
          }
        }
      };
      const getAllWeekData = () => {
        const { prevNum, nowNum, nextNum } = getTranIndex("month");
        const { year: selYear, month: selMonth, day: selDay } = data.selDate;
        let sDate = selYear + "-" + selMonth + "-" + selDay;
        let allWeekList = [[], [], []];
        let prevMonthList = data.allMonthList[prevNum];
        let nowMonthList = data.allMonthList[nowNum];
        let nextMonthList = data.allMonthList[nextNum];
        for (let i = 0; i < nowMonthList.length; i++) {
          for (let j = 0; j < nowMonthList[i].length; j++) {
            if (sDate == nowMonthList[i][j].date) {
              allWeekList[0][0] = nowMonthList[i - 1];
              allWeekList[1][0] = nowMonthList[i];
              allWeekList[2][0] = nowMonthList[i + 1];
              if (i == 5) {
                allWeekList[2][0] = nextMonthList[1];
              } else if (i == 0) {
                for (let k = prevMonthList.length - 1; k >= 0; k--) {
                  if (prevMonthList[k][6].dayType == "normal") {
                    allWeekList[0][0] = prevMonthList[k];
                    break;
                  }
                }
              }
              break;
            }
          }
        }
        data.allWeekList = allWeekList;
      };
      const swiperEndChange = () => {
        data.tranDuration = 300;
      };
      const swiperChange = (e) => {
        let current = e.detail.current;
        let oldIndex = data.shrinkType ? data.tranCurrent : data.tranIndex;
        let type = oldIndex - current == -1 || oldIndex - current == 2 ? "next" : "prev";
        if (data.shrinkType) {
          data.tranCurrent = current;
          if (current != oldIndex)
            getOtherWeekData(type);
        } else {
          data.tranIndex = current;
          if (current != oldIndex)
            getOtherData(type);
        }
        emit("swiperChange", data.showToday);
      };
      const changeMonthOrWeek = (type) => {
        if (!data.deterChange)
          return;
        data.deterChange = false;
        setTimeout((_) => {
          data.deterChange = true;
        }, 400);
        data.tranDuration = 300;
        let tranType = data.shrinkType ? "week" : "month";
        let current = getTranIndex(tranType).prevNum;
        if (type == "next")
          current = getTranIndex(tranType).nextNum;
        if (tranType == "week") {
          data.tranCurrent = current;
          getOtherWeekData(type);
        } else {
          data.tranIndex = current;
          getOtherData(type);
        }
      };
      const changeShrink = () => {
        data.shrinkType = !data.shrinkType;
        if (data.tranDuration != 0)
          data.tranDuration = 0;
        if (data.shrinkType) {
          data.tranCurrent = 1;
          getAllWeekData();
        }
        returnShrinkChange();
        judgeShowToday();
      };
      const goToday = () => {
        if (data.tranDuration != 0)
          data.tranDuration = 0;
        let oldDate = JSON.parse(JSON.stringify(data.selDate));
        initDate();
        if (data.shrinkType) {
          data.tranCurrent = 1;
          getAllWeekData();
          let today = data.today;
          if (oldDate.year != today.year || oldDate.month != today.month) {
            returnMonthChange("today");
          } else {
            returnDayChange(data.today);
          }
        } else {
          returnMonthChange("today");
        }
        judgeShowToday();
      };
      const clickDay = (dayInfo) => {
        let { year, month, day } = data.selDate;
        if (day == dayInfo.day && month == dayInfo.month && year == dayInfo.year)
          return;
        let oldSel = JSON.parse(JSON.stringify(data.selDate));
        data.selDate.day = dayInfo.day;
        if (oldSel.month != dayInfo.month) {
          if (!data.shrinkType) {
            changeMonthOrWeek(dayInfo.dayType);
            return;
          } else {
            data.selDate.year = dayInfo.year;
            data.selDate.month = dayInfo.month;
            let current = getTranIndex("month").prevNum;
            if (dayInfo.dayType == "next")
              current = getTranIndex("month").nextNum;
            data.tranIndex = current;
            let monthData = getMonthData(getMonthDate(data.selDate, dayInfo.dayType == "prev" ? -1 : 1));
            let current2 = getTranIndex("month").prevNum;
            if (dayInfo.dayType == "next")
              current2 = getTranIndex("month").nextNum;
            data.allMonthList.splice(current2, 1, monthData);
          }
          returnMonthChange(dayInfo.dayType);
        } else {
          returnDayChange(dayInfo);
        }
      };
      const judgeShowToday = () => {
        const { year, month, day } = data.today;
        const { year: selYeat, month: selMonth, day: selDay } = data.selDate;
        if (data.shrinkType) {
          let selTimes = new Date(selYeat, selMonth - 1, selDay).getTime();
          let week = new Date(year, month - 1, day).getDay();
          let firstWD = getDateByDateAndDay(data.today, -week + (props.firstDayOfWeek == "monday" ? 1 : 0));
          let lastWD = getDateByDateAndDay(data.today, 6 - week + (props.firstDayOfWeek == "monday" ? 1 : 0));
          let firstTimes = new Date(firstWD.year, firstWD.month - 1, firstWD.day).getTime();
          let lastTimes = new Date(lastWD.year, lastWD.month - 1, lastWD.day).getTime();
          if (selTimes > lastTimes || selTimes < firstTimes)
            data.showToday = true;
          else
            data.showToday = false;
        } else {
          if (year != selYeat || month != selMonth)
            data.showToday = true;
          else
            data.showToday = false;
        }
      };
      const returnDayChange = (dayInfo) => {
        let { year, month, day } = dayInfo;
        let dayDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
        let returnData = {
          date: dayDate,
          year,
          month,
          day,
          week: dayInfo.week,
          daySign: dayInfo.sign
        };
        if (props.showLunar)
          returnData["lunar"] = dayInfo.lunar;
        emit("dayChange", returnData);
      };
      const returnMonthChange = (type) => {
        let selDate = data.selDate.year + "-" + data.selDate.month + "-" + data.selDate.day;
        let monthList = data.allMonthList.flat().flat();
        let dayInfo = monthList.find((day) => day.date == selDate);
        returnDayChange(dayInfo);
        emit("monthChange", {
          year: dayInfo.year,
          month: dayInfo.month,
          type
        });
      };
      const returnShrinkChange = () => {
        let type = data.shrinkType ? "week" : "month";
        emit("shrinkClick", type);
      };
      const getTranIndex = (type = "month") => {
        let current = data.tranIndex;
        if (type == "week")
          current = data.tranCurrent;
        let prevNum = current - 1 < 0 ? 2 : current - 1;
        let nowNum = current;
        let nextNum = current + 1 > 2 ? 0 : current + 1;
        return { prevNum, nowNum, nextNum };
      };
      const getDateByDateAndDay = (date, num) => {
        let dTime = (/* @__PURE__ */ new Date(date.year + "/" + date.month + "/" + date.day)).getTime() + num * 24 * 60 * 60 * 1e3;
        let nd = new Date(dTime);
        return {
          year: nd.getFullYear(),
          month: nd.getMonth() + 1,
          day: nd.getDate()
        };
      };
      const getMonthDate = (date, num = 1) => {
        let nextMonth = date.month + num;
        let diffYear = parseInt(Math.abs(nextMonth) / 12);
        let year = date.year;
        let month = nextMonth;
        if (nextMonth > 12) {
          year = date.year + diffYear;
          month = nextMonth % 12;
        } else if (nextMonth < 1) {
          year = date.year - (diffYear + 1);
          month = nextMonth + 12 * (diffYear + 1);
        }
        let monthMaxDay = new Date(year, month, 0).getDate();
        let day = date.day > monthMaxDay ? monthMaxDay : date.day;
        return { year, month, day };
      };
      vue.onMounted(() => {
        create();
      });
      expose({
        goToday
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "lunc-calendar" }, [
          vue.createCommentVNode(" 头部上下月按钮及月份 "),
          vue.createCommentVNode(` <view class="header">\r
			<view class="head-icon head-pre-month" v-show="showChangeBtn" @click="changeMonthOrWeek('prev')"></view>\r
			<view class="head-month">\r
				{{data.selDate.year+'年'+(data.selDate.month<10?'0'+data.selDate.month:data.selDate.month)+'月'}}\r
			</view>\r
			<view class="head-icon head-next-month" v-show="showChangeBtn" @click="changeMonthOrWeek('next')"></view>\r
			<view class="go-to-today" v-show="data.showToday" @click="goToday">今</view>\r
		</view> `),
          vue.createCommentVNode(" 星期 "),
          vue.createElementVNode("view", { class: "week-area" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(data.weekArr, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: "week-font",
                    key: index
                  },
                  vue.toDisplayString(__props.weekType + "" + item),
                  1
                  /* TEXT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" 日历 "),
          vue.createElementVNode("swiper", {
            class: "calendar-data",
            current: data.shrinkType ? data.tranCurrent : data.tranIndex,
            circular: "",
            duration: data.tranDuration,
            onChange: swiperChange,
            onAnimationfinish: swiperEndChange,
            style: vue.normalizeStyle({ height: data.shrinkType ? "56px" : "266px" })
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(vue.unref(getAllData), (a, i) => {
                return vue.openBlock(), vue.createElementBlock("swiper-item", {
                  class: "swiper-item swiper-prev-item",
                  key: i
                }, [
                  vue.createCommentVNode(' <view class="month-bg" v-if="showMonthBg">{{ getMontBg }}</view> '),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["month-days", data.shrinkType ? "item-week" : ""])
                    },
                    [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(a, (b, j) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "week-days",
                            key: j
                          }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(b, (c, k) => {
                                return vue.openBlock(), vue.createElementBlock("view", {
                                  class: "day",
                                  key: k,
                                  onClick: ($event) => clickDay(c)
                                }, [
                                  vue.createElementVNode("view", { class: "day-info" }, [
                                    vue.createElementVNode(
                                      "view",
                                      {
                                        class: vue.normalizeClass(["infoof", [c.dayClass, vue.unref(getIsSelDay)(c) ? "is-sel" : "", c.dayType != "normal" ? "un-month" : ""]])
                                      },
                                      [
                                        vue.createElementVNode(
                                          "text",
                                          { class: "day-solar" },
                                          vue.toDisplayString(c.day),
                                          1
                                          /* TEXT */
                                        ),
                                        __props.showLunar || c.sign && c.sign.length > 0 ? (vue.openBlock(), vue.createElementBlock(
                                          vue.Fragment,
                                          { key: 0 },
                                          [
                                            c.sign && c.sign.length > 0 ? (vue.openBlock(), vue.createElementBlock("text", {
                                              key: 0,
                                              class: "day-tag"
                                            })) : vue.createCommentVNode("v-if", true),
                                            c.sign && c.sign.length > 0 ? (vue.openBlock(), vue.createElementBlock(
                                              "text",
                                              {
                                                key: 1,
                                                class: "day-sign"
                                              },
                                              vue.toDisplayString(c.sign[0].title),
                                              1
                                              /* TEXT */
                                            )) : vue.createCommentVNode("v-if", true),
                                            vue.createElementVNode(
                                              "text",
                                              { class: "day-lunar" },
                                              vue.toDisplayString(c.dayLunar),
                                              1
                                              /* TEXT */
                                            )
                                          ],
                                          64
                                          /* STABLE_FRAGMENT */
                                        )) : vue.createCommentVNode("v-if", true)
                                      ],
                                      2
                                      /* CLASS */
                                    )
                                  ])
                                ], 8, ["onClick"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    2
                    /* CLASS */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 44, ["current", "duration"]),
          vue.createCommentVNode(" 收缩按钮 "),
          __props.showShrink ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "shrink",
            onClick: changeShrink
          }, [
            vue.createCommentVNode(` <image class="tran1" src="/static/calendar/tran.png" mode=""\r
				:class="data.shrinkType?'shrink-open':'shrink-close'"></image> `),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["iconfont shrink-btn", data.shrinkType ? "icon-a-Group35516" : "icon-a-Group35587"])
              },
              null,
              2
              /* CLASS */
            )
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const lzCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-0688a28f"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-calendar/lz-calendar.vue"]]);
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "calendar",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const selected = [
        { date: "2023-05-22", info: "签到1" },
        { date: "2023-05-23", info: "签到" },
        { date: "2023-05-24", info: "签到1" },
        { date: "2023-05-25", info: "签到" },
        { date: "2023-05-26", info: "签到1" },
        { date: "2023-05-27", info: "签到" },
        { date: "2023-05-28", info: "签到1" },
        { date: "2023-05-29", info: "签到" },
        { date: "2023-06-03", info: "签到" }
      ];
      let showToday = vue.ref(false);
      let calendarRef = vue.ref(null);
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const handleGoToday = () => {
        calendarRef.value.goToday();
        showToday.value = false;
      };
      const swiperChange = (show) => {
        showToday.value = show;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "calendar-wrap" }, [
          vue.createVNode(lzNavBar, null, {
            content: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "nav-bar-content" }, [
                vue.createElementVNode("view", { class: "nav-bar-left" }, [
                  vue.createElementVNode("text", { class: "date" }, "2023年3月"),
                  vue.createElementVNode("text", { class: "iconfont icon-a-Group35752 left-icon" })
                ]),
                vue.createElementVNode("view", { class: "nav-bar-right" }, [
                  vue.unref(showToday) ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "action-txt",
                    onClick: handleGoToday
                  }, "今")) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("text", { class: "iconfont icon-a-Group2033 action-txt" }),
                  vue.createElementVNode("text", { class: "iconfont icon-a-Group1499 action-txt" })
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode(
            "view",
            {
              class: "calendar-content",
              style: vue.normalizeStyle(vue.unref(contentStyle))
            },
            [
              vue.createCommentVNode(" 日历内容 "),
              vue.createVNode(
                lzCalendar,
                {
                  ref_key: "calendarRef",
                  ref: calendarRef,
                  weekType: "",
                  showLunar: "",
                  showMonthBg: "",
                  showShrink: "",
                  signList: selected,
                  onSwiperChange: swiperChange
                },
                null,
                512
                /* NEED_PATCH */
              )
            ],
            4
            /* STYLE */
          ),
          vue.createVNode(lzTabBar, { current: 1 })
        ]);
      };
    }
  });
  const PagesTabBarCalendarCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-c3697b44"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/calendar/calendar.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-leve-list",
    props: {
      icon: { type: String, required: false, default: "" },
      title: { type: String, required: false, default: "" },
      list: { type: Array, required: false, default: () => [] },
      headerBg: { type: String, required: false, default: "" }
    },
    setup(__props) {
      const data = __props;
      const leveHeaderStyle = vue.computed(() => {
        return `
			background-color: ${data.headerBg};
		`;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "lz-leve-wrap" }, [
          vue.createElementVNode(
            "view",
            {
              class: "leve-header",
              style: vue.normalizeStyle(vue.unref(leveHeaderStyle))
            },
            [
              vue.createElementVNode("view", { class: "leve-header-left" }, [
                vue.createElementVNode("image", {
                  class: "leve-img",
                  src: data.icon
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "text",
                  { class: "title" },
                  vue.toDisplayString(data.title),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("text", { class: "iconfont icon-a-Group1455" })
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("scroll-view", {
            class: "leve-box",
            "scroll-y": ""
          }, [
            vue.createVNode(lzRecursiveMenu, {
              type: "quadrants",
              list: data.list,
              indentationSize: 18
            }, null, 8, ["list"])
          ])
        ]);
      };
    }
  });
  const lzLeveList = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-9b77594c"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/quadrants/cpn/lz-leve-list.vue"]]);
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "quadrants",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const menus = [
        {
          icon: "",
          name: "任务排序",
          event: "popup"
        },
        {
          icon: "",
          name: "显示已完成"
        }
      ];
      const popup = vue.ref();
      const popupBodyHeight = vue.computed(() => {
        const H = menus.length * 76;
        return H;
      });
      const navRightIcon = () => {
        popup.value.show(uni.upx2px(460), navHeight + uni.upx2px(20));
      };
      const handleMenus = (item) => {
        if (item.event == "popup") {
          popup.value.show();
        }
      };
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const leveList = vue.reactive([
        {
          name: "别睡懒觉",
          tips: "3月10日 过期三天",
          expanded: true,
          directoryIcon: "icon",
          type: "parent"
        },
        {
          name: "周六计划",
          expanded: true,
          directoryIcon: "icon",
          type: "parent",
          children: [
            {
              name: "春游"
            }
          ]
        },
        {
          expanded: true,
          directoryIcon: "icon",
          directoryName: "伟大的计划😊",
          children: [
            {
              name: "周六计划",
              tips: "3月10日 过期三天"
            },
            {
              name: "胶卷相机",
              tips: "3月22日"
            }
          ]
        }
      ]);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "quadrants-wrap" }, [
              vue.createVNode(lzNavBar, {
                "is-back": false,
                rightIcon: "",
                leftText: "四象限",
                onRightIcon: navRightIcon
              }),
              vue.createElementVNode(
                "view",
                {
                  class: "quadrants-content",
                  style: vue.normalizeStyle(vue.unref(contentStyle))
                },
                [
                  vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between" } }, [
                    vue.createVNode(vue.unref(lzLeveList), {
                      title: "重要且紧急",
                      list: leveList,
                      icon: "/static/images/quadrants/leve1.png",
                      headerBg: "#E87A87"
                    }, null, 8, ["list"]),
                    vue.createVNode(vue.unref(lzLeveList), {
                      title: "重要不紧急",
                      list: leveList,
                      icon: "/static/images/quadrants/leve2.png",
                      headerBg: "#FBB116"
                    }, null, 8, ["list"])
                  ]),
                  vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "space-between", "margin-top": "22rpx" } }, [
                    vue.createVNode(vue.unref(lzLeveList), {
                      title: "不重要但紧急",
                      list: leveList,
                      icon: "/static/images/quadrants/leve3.png",
                      headerBg: "#81A5FB"
                    }, null, 8, ["list"]),
                    vue.createVNode(vue.unref(lzLeveList), {
                      title: "不重要不紧急",
                      list: leveList,
                      icon: "/static/images/quadrants/leve4.png",
                      headerBg: "#6EC1A3"
                    }, null, 8, ["list"])
                  ])
                ],
                4
                /* STYLE */
              ),
              vue.createVNode(lzTabBar, { current: 2 })
            ]),
            vue.createVNode(lzPopup, {
              ref_key: "popup",
              ref: popup,
              "body-width": 260,
              "body-height": vue.unref(popupBodyHeight)
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: "popup-menus-wrap",
                    style: vue.normalizeStyle("height:" + vue.unref(popupBodyHeight) + "rpx;")
                  },
                  [
                    (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(menus, (item, index) => {
                        return vue.createElementVNode("view", {
                          class: "popup-menus-item",
                          "hover-class": "menus-hover",
                          key: index,
                          onClick: ($event) => handleMenus(item)
                        }, [
                          vue.createElementVNode(
                            "text",
                            { class: "iconfont menus-icon" },
                            vue.toDisplayString(item.icon),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "menus-name" },
                            vue.toDisplayString(item.name),
                            1
                            /* TEXT */
                          )
                        ], 8, ["onClick"]);
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ],
                  4
                  /* STYLE */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["body-height"])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesTabBarQuadrantsQuadrants = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-9763b372"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/quadrants/quadrants.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "main",
    setup(__props) {
      const list = [
        {
          img: "",
          type: 0
        },
        {
          img: "/static/images/habitBuildingSystem/corgi.png",
          type: 1
        }
      ];
      let current = vue.ref(1);
      const toLoadingPage = () => {
        uni.reLaunch({
          url: "/pages/tabBar/habitBuildingSystem/loadingPage/loadingPage"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "wrap" }, [
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "greeting-message" }, [
              vue.createElementVNode("text", { class: "greeting-message-txt" }, "快来培育一颗树苗"),
              vue.createElementVNode("text", { class: "greeting-message-txt" }, "或领养一只小动物吧！")
            ]),
            vue.createElementVNode("view", { class: "cultivation-category" }, [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(list, (item, index) => {
                  return vue.createElementVNode("view", {
                    class: "cell",
                    key: index
                  }, [
                    vue.createElementVNode("view", {
                      class: vue.normalizeClass(vue.unref(current) == index ? "item item-active" : "item"),
                      onClick: ($event) => vue.isRef(current) ? current.value = index : current = index
                    }, [
                      vue.createElementVNode("image", {
                        class: "item-img",
                        src: item.img
                      }, null, 8, ["src"])
                    ], 10, ["onClick"])
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("view", { class: "bottom-action" }, [
              vue.createElementVNode("button", {
                class: "bottom-action-btn",
                onClick: toLoadingPage
              }, "开始专注"),
              vue.createElementVNode("text", { class: "bottom-action-txt" }, "快来开启你的专注之旅吧~")
            ])
          ]),
          vue.createVNode(lzTabBar, { current: 3 })
        ]);
      };
    }
  });
  const PagesTabBarHabitBuildingSystemMain = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-ab1730f8"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/habitBuildingSystem/main.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "userProfile",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight;
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      let user = vue.reactive({
        nickname: "",
        avatar: "data:image/jpeg;base64,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",
        isVip: false,
        type: 1
      });
      const vip = [
        {
          name: "更多任务，可创建999条任务"
        },
        {
          name: "更多清单，可创建199条任务"
        },
        {
          name: "更多任务描述，可添加10000个文字"
        }
      ];
      const personalization = [
        {
          title: "声音与提醒",
          icon: "/static/images/userProfile/notice.png",
          url: "/pages/audioAndAlertSettings/audioAndAlertSettings"
        }
      ];
      const about = [
        {
          title: "建议与反馈",
          icon: "/static/images/userProfile/feedback.png",
          event: "about"
        },
        {
          title: "给应用评分",
          icon: "/static/images/userProfile/evaluation.png"
        },
        {
          title: "关于我们",
          icon: "/static/images/userProfile/about.png",
          url: "/pages/aboutUs/aboutUs"
        }
      ];
      const popup = vue.ref();
      const handleCell = (item) => {
        if (item.url) {
          uni.navigateTo({
            url: item.url
          });
        }
        if (item.event == "about") {
          popup.value.show();
        }
      };
      const closePopup = () => {
        popup.value.hide();
      };
      const toPersonalCenter = () => {
        uni.navigateTo({
          url: "/pages/accountManagement/personalInformationDetails/personalInformationDetails"
        });
      };
      const toVIPMemberShip = () => {
        uni.navigateTo({
          url: "/pages/vipMembership/vipMembership"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "tab-bar-main" }, [
              vue.createVNode(lzStatus),
              vue.createElementVNode(
                "view",
                {
                  class: "content",
                  style: vue.normalizeStyle(vue.unref(contentStyle))
                },
                [
                  vue.createElementVNode("view", {
                    class: "user",
                    onClick: toPersonalCenter
                  }, [
                    vue.createElementVNode("image", {
                      class: "user-avatar",
                      src: vue.unref(user).avatar
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "user-info" }, [
                      vue.createElementVNode("text", { class: "user-nickname" }, "正在战斗的乌龟123456"),
                      vue.createElementVNode("view", { class: "vip" }, [
                        vue.createElementVNode("text", null, "终身VIP")
                      ])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "premium-membership-services" }, [
                    vue.createElementVNode("text", { class: "title" }, "高级会员"),
                    vue.createElementVNode("view", { class: "vip-desc" }, [
                      (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(vip, (item, index) => {
                          return vue.createElementVNode("view", {
                            class: "vip-desc-item",
                            key: index
                          }, [
                            vue.createElementVNode("image", {
                              class: "item-img",
                              src: "/static/images/userProfile/vip_check.png"
                            }),
                            vue.createElementVNode(
                              "text",
                              { class: "vip-desc-txt" },
                              vue.toDisplayString(item.name),
                              1
                              /* TEXT */
                            )
                          ]);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ]),
                    vue.createElementVNode("view", { class: "vip-detail" }, [
                      vue.createElementVNode("text", { class: "vip-detail-left iconfont icon-a-Group1635" }),
                      vue.createElementVNode("view", {
                        class: "vip-detail-right",
                        onClick: toVIPMemberShip
                      }, [
                        vue.createElementVNode("text", null, "了解详情"),
                        vue.createElementVNode("text", { class: "iconfont icon-jiantou" })
                      ])
                    ])
                  ]),
                  vue.createVNode(lzFeatureList, {
                    name: "个性化",
                    data: personalization,
                    onClick: handleCell
                  }),
                  vue.createVNode(lzFeatureList, {
                    name: "关于",
                    data: about,
                    onClick: handleCell
                  })
                ],
                4
                /* STYLE */
              ),
              vue.createVNode(lzTabBar, { current: 4 })
            ]),
            vue.createVNode(
              lzPopup,
              {
                ref_key: "popup",
                ref: popup,
                "body-width": 600,
                "body-height": 446,
                center: "",
                maskColor: "",
                rounded: "40"
              },
              {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "popup" }, [
                    vue.createElementVNode("view", { class: "popup-header" }, [
                      vue.createElementVNode("view", { class: "popup-header-center" }, [
                        vue.createElementVNode("text", { class: "popup-header-title" }, "建议与反馈")
                      ]),
                      vue.createElementVNode("view", {
                        class: "popup-header-right",
                        onClick: closePopup
                      }, [
                        vue.createElementVNode("text", { class: "iconfont icon-guanbi" })
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "popup-content" }, [
                      vue.createElementVNode("view", { class: "popup-item-box" }, [
                        vue.createElementVNode("text", { class: "popup-item" }, "邮箱：modai08@163.com"),
                        vue.createElementVNode("text", { class: "popup-item" }, "QQ群：114")
                      ]),
                      vue.createElementVNode("view", { class: "popup-bottom" }, [
                        vue.createElementVNode("button", { class: "popup-bottom-btn" }, "社区反馈")
                      ])
                    ])
                  ])
                ]),
                _: 1
                /* STABLE */
              },
              512
              /* NEED_PATCH */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesTabBarUserProfileUserProfile = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-646b9ae6"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/userProfile/userProfile.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "aboutUs",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const list = [
        {
          title: "官网",
          value: "www.funthy.com"
        },
        {
          title: "邮箱",
          value: "modai08@163.com"
        },
        {
          title: "QQ群",
          value: "89126378613"
        },
        {
          title: "用户协议"
        },
        {
          title: "隐私协议"
        },
        {
          title: "个人信息收集清单"
        },
        {
          title: "第三方信息共享清单"
        }
      ];
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "about-wrap" }, [
          vue.createVNode(lzNavBar, {
            "left-icon": "",
            leftText: "关于我们"
          }),
          vue.createElementVNode(
            "view",
            {
              class: "about-content",
              style: vue.normalizeStyle(vue.unref(contentStyle))
            },
            [
              vue.createElementVNode("view", { class: "app-information" }, [
                vue.createElementVNode("image", {
                  class: "logo-img",
                  src: "/static/images/common/logo.png"
                }),
                vue.createElementVNode("text", { class: "logo-name" }, "Todo 计划"),
                vue.createElementVNode("text", { class: "version" }, "1.0.0")
              ]),
              vue.createVNode(lzFeatureList, {
                height: 82,
                data: list,
                "margin-top": 40,
                padding: [0, 30]
              })
            ],
            4
            /* STYLE */
          )
        ]);
      };
    }
  });
  const PagesAboutUsAboutUs = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-d8855c81"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/aboutUs/aboutUs.vue"]]);
  const toast = (str) => {
    return new Promise((resolve, reject) => {
      uni.showToast({
        title: str,
        icon: "none",
        duration: 2e3,
        success: () => {
          setTimeout(() => {
          }, 2e3);
        }
      });
    });
  };
  const successToast = (str) => {
    return new Promise((resolve, reject) => {
      uni.showToast({
        title: str,
        icon: "success",
        duration: 2e3,
        success: () => {
          setTimeout(() => {
            resolve();
          }, 2e3);
        }
      });
    });
  };
  const showLoading = () => {
    return new Promise((resolve, reject) => {
      uni.showLoading({
        success: () => {
          resolve();
        }
      });
    });
  };
  const tipLoading = (str) => {
    return new Promise((resolve, reject) => {
      uni.showLoading({
        title: str,
        success: () => {
          resolve();
        }
      });
    });
  };
  const hideLoading = () => {
    return new Promise((resolve, reject) => {
      uni.hideLoading({
        success: () => {
          resolve();
        }
      });
    });
  };
  const showCancel = (title, content) => {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title,
        content,
        showCancel: true,
        confirmColor: "#FF9500",
        success: (res) => {
          if (res.confirm) {
            resolve();
          } else {
            reject();
          }
        }
      });
    });
  };
  const hideCancel = (title, content) => {
    return new Promise((resolve, reject) => {
      uni.showModal({
        title,
        content,
        showCancel: false,
        confirmColor: "#FF9500",
        success: (res) => {
          if (res.confirm) {
            resolve();
          }
        }
      });
    });
  };
  const $tips = {
    toast,
    successToast,
    showLoading,
    tipLoading,
    hideLoading,
    showCancel,
    hideCancel
  };
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "lz-account-form",
    props: {
      leftText: { type: String, required: false, default: "" },
      type: { type: String, required: true, default: "" },
      btnText: { type: String, required: true, default: "" }
    },
    emits: ["btnClick"],
    setup(__props, { emit }) {
      const data = __props;
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const form = {
        email: "",
        code: "",
        password: "",
        passwordtwo: ""
      };
      const toAccountForm = (type) => {
        let url = type == 1 ? "/pages/accountManagement/changeAndRecoverPassword/changeAndRecoverPassword?type=1" : "/pages/accountManagement/registerAccount/registerAccount";
        uni.navigateTo({
          url
        });
      };
      const toLogin = () => {
        uni.navigateTo({
          url: "/pages/accountManagement/emailLogin/emailLogin"
        });
      };
      const handleTapBtn = () => {
        emit("btnClick");
      };
      const itemStyle = vue.computed(() => {
        const num = data.type == "5" || data.type == "4" ? 20 : 40;
        return `
			margin-top: ${num}rpx
		`;
      });
      const accountStyle = vue.computed(() => {
        const num = data.type == "5" || data.type == "4" ? -20 : 80;
        return `
			margin-top: ${num}rpx
		`;
      });
      let showPassword = vue.ref(false);
      let verifyCodeText = vue.ref("发送验证码");
      let disabled = vue.ref(false);
      let time;
      const getVerifyCode = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email) {
          return $tips.toast("请先输入邮箱");
        }
        if (!emailRegex.test(form.email)) {
          return $tips.toast("请输入正确的邮箱地址");
        }
        if (disabled.value) {
          return $tips.toast("倒计时结束后再获取");
        }
        let seconds = 60;
        time = setInterval(() => {
          seconds--;
          if (seconds > 0) {
            disabled.value = true;
            verifyCodeText.value = seconds + "s";
          } else {
            seconds = 60;
            disabled.value = false;
            verifyCodeText.value = "重新发送";
            clearInterval(time);
          }
        }, 1e3);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "about-wrap" }, [
          vue.createVNode(lzNavBar, {
            statusBgColor: "#fff",
            bgColor: "#fff",
            "left-icon": "",
            leftText: __props.leftText
          }, null, 8, ["leftText"]),
          vue.createElementVNode(
            "view",
            {
              class: "about-content",
              style: vue.normalizeStyle(vue.unref(contentStyle))
            },
            [
              vue.createElementVNode("view", { class: "about-plc" }, [
                data.type == "4" || data.type == "5" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "risk-warning"
                }, [
                  vue.createElementVNode("text", null, "⚠ 注销后，该账号将永久删除，所有该账号相关的数据将被抹去。注销后 账号无法找回和再次注册。该操作是不可逆的，请三思 ！")
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode(
                  "view",
                  {
                    class: "account",
                    style: vue.normalizeStyle(vue.unref(accountStyle))
                  },
                  [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(data.type == "5" ? "item item1" : "item")
                      },
                      [
                        vue.createElementVNode("image", {
                          class: "item-icon",
                          src: "/static/images/userProfile/evaluation.png"
                        }),
                        vue.withDirectives(vue.createElementVNode("input", {
                          class: "item-input",
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.email = $event),
                          placeholder: data.type == "5" ? "正在获取确认码..." : "请输入邮箱",
                          disabled: data.type == "5" ? true : false,
                          "placeholder-class": "plc"
                        }, null, 8, ["placeholder", "disabled"]), [
                          [vue.vModelText, form.email]
                        ])
                      ],
                      2
                      /* CLASS */
                    ),
                    data.type != "0" ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 0,
                        class: "item",
                        style: vue.normalizeStyle(vue.unref(itemStyle))
                      },
                      [
                        vue.createElementVNode("image", {
                          class: "item-icon",
                          src: "/static/images/userProfile/evaluation.png"
                        }),
                        vue.withDirectives(vue.createElementVNode("input", {
                          class: "item-input",
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.code = $event),
                          placeholder: data.type == "5" ? "请输入上方确认码" : "输入验证码",
                          "placeholder-class": "plc"
                        }, null, 8, ["placeholder"]), [
                          [vue.vModelText, form.code]
                        ]),
                        data.type != "5" ? (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 0,
                            class: "verification-code",
                            onClick: getVerifyCode,
                            style: vue.normalizeStyle(vue.unref(disabled) ? "color: #999;" : "")
                          },
                          vue.toDisplayString(vue.unref(verifyCodeText)),
                          5
                          /* TEXT, STYLE */
                        )) : vue.createCommentVNode("v-if", true)
                      ],
                      4
                      /* STYLE */
                    )) : vue.createCommentVNode("v-if", true),
                    data.type != "4" && data.type != "5" ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 1,
                        class: "item",
                        style: vue.normalizeStyle(vue.unref(itemStyle))
                      },
                      [
                        data.type != "2" ? (vue.openBlock(), vue.createElementBlock("image", {
                          key: 0,
                          class: "item-icon",
                          src: "/static/images/userProfile/evaluation.png"
                        })) : vue.createCommentVNode("v-if", true),
                        vue.withDirectives(vue.createElementVNode("input", {
                          class: "item-input",
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.password = $event),
                          placeholder: data.type == "0" ? "请输入密码" : "新密码，6-20位字符",
                          "placeholder-class": "plc",
                          type: vue.unref(showPassword) ? "text" : "password"
                        }, null, 8, ["placeholder", "type"]), [
                          [vue.vModelDynamic, form.password]
                        ]),
                        vue.createElementVNode("image", {
                          onClick: _cache[3] || (_cache[3] = ($event) => vue.isRef(showPassword) ? showPassword.value = !vue.unref(showPassword) : showPassword = !vue.unref(showPassword)),
                          class: "input-right-icon",
                          src: vue.unref(showPassword) ? "/static/images/common/eye-open.png" : "/static/images/common/eye-close.png"
                        }, null, 8, ["src"])
                      ],
                      4
                      /* STYLE */
                    )) : vue.createCommentVNode("v-if", true),
                    data.type == "1" || data.type == "2" || data.type == "3" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 2,
                      class: "item"
                    }, [
                      data.type != "2" ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        class: "item-icon",
                        src: "/static/images/userProfile/evaluation.png"
                      })) : vue.createCommentVNode("v-if", true),
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "item-input",
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.passwordtwo = $event),
                        placeholder: "确认密码",
                        "placeholder-class": "plc",
                        type: vue.unref(showPassword) ? "text" : "password"
                      }, null, 8, ["type"]), [
                        [vue.vModelDynamic, form.passwordtwo]
                      ]),
                      vue.createElementVNode("image", {
                        onClick: _cache[5] || (_cache[5] = ($event) => vue.isRef(showPassword) ? showPassword.value = !vue.unref(showPassword) : showPassword = !vue.unref(showPassword)),
                        class: "input-right-icon",
                        src: vue.unref(showPassword) ? "/static/images/common/eye-open.png" : "/static/images/common/eye-close.png"
                      }, null, 8, ["src"])
                    ])) : vue.createCommentVNode("v-if", true)
                  ],
                  4
                  /* STYLE */
                ),
                data.type == "0" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "action-account"
                }, [
                  vue.createElementVNode("text", {
                    onClick: _cache[6] || (_cache[6] = ($event) => toAccountForm(1))
                  }, "忘记密码"),
                  vue.createElementVNode("text", {
                    onClick: _cache[7] || (_cache[7] = ($event) => toAccountForm(2))
                  }, "立即注册")
                ])) : vue.createCommentVNode("v-if", true),
                data.type == "2" ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  class: "login-now"
                }, [
                  vue.createElementVNode("text", { onClick: toLogin }, "已有账户，立即登录")
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode(
                  "button",
                  {
                    class: "btn",
                    onClick: handleTapBtn
                  },
                  vue.toDisplayString(__props.btnText),
                  1
                  /* TEXT */
                ),
                data.type == "0" || data.type == "2" ? (vue.openBlock(), vue.createBlock(lzAgreement, { key: 3 })) : vue.createCommentVNode("v-if", true)
              ])
            ],
            4
            /* STYLE */
          )
        ]);
      };
    }
  });
  const lzAccountForm = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-68cd1e0f"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/components/lz-ui/lz-account-from/lz-account-form.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "emailLogin",
    setup(__props) {
      const btnClick = () => {
        uni.reLaunch({
          url: "/pages/tabBar/index/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(lzAccountForm, {
            type: "0",
            "left-text": "邮箱登录",
            "btn-text": "登录",
            onBtnClick: btnClick
          })
        ]);
      };
    }
  });
  const PagesAccountManagementEmailLoginEmailLogin = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/accountManagement/emailLogin/emailLogin.vue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "registerAccount",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(lzAccountForm, {
            type: "2",
            "left-text": "立即注册",
            "btn-text": "注册"
          })
        ]);
      };
    }
  });
  const PagesAccountManagementRegisterAccountRegisterAccount = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/accountManagement/registerAccount/registerAccount.vue"]]);
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "changeAndRecoverPassword",
    setup(__props) {
      let type = vue.ref("");
      let leftText = vue.ref("");
      let btnText = vue.ref("");
      onLoad((opt) => {
        if (opt == null ? void 0 : opt.type) {
          type.value = opt.type;
        }
        init();
      });
      const init = () => {
        leftText.value = type.value == "1" ? "忘记密码" : "修改密码";
        btnText.value = type.value == "1" ? "重置密码" : "修改密码";
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(lzAccountForm, {
            type: vue.unref(type),
            "left-text": vue.unref(leftText),
            "btn-text": vue.unref(btnText)
          }, null, 8, ["type", "left-text", "btn-text"])
        ]);
      };
    }
  });
  const PagesAccountManagementChangeAndRecoverPasswordChangeAndRecoverPassword = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/accountManagement/changeAndRecoverPassword/changeAndRecoverPassword.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "accountDeletion",
    setup(__props) {
      let type = vue.ref("");
      onLoad((opt) => {
        if (opt == null ? void 0 : opt.type) {
          type.value = opt.type;
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(lzAccountForm, {
            type: vue.unref(type),
            "left-text": "注销帐号",
            "btn-text": "注销帐号"
          }, null, 8, ["type"])
        ]);
      };
    }
  });
  const PagesAccountManagementAccountDeletionAccountDeletion = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-8e5a7478"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/accountManagement/accountDeletion/accountDeletion.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "completionSound",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const list = [
        {
          title: "允许后台运行",
          label: "设置「允许后台运行」"
        },
        {
          title: "忽略电池优化",
          label: "设置「不优化」"
        },
        {
          title: "关闭省电模式",
          label: "关闭「省电模式」"
        },
        {
          title: "允许后台运行",
          label: "允许「自启动」"
        },
        {
          title: "允许后台运行",
          label: "进入「后台管理」，设置「应用后台锁定」"
        }
      ];
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "about-wrap" }, [
          vue.createVNode(lzNavBar, {
            "left-icon": "",
            leftText: "提醒工作"
          }),
          vue.createElementVNode(
            "view",
            {
              class: "about-content",
              style: vue.normalizeStyle(vue.unref(contentStyle))
            },
            [
              vue.createElementVNode("view", { class: "friendly-reminde" }, [
                vue.createElementVNode("text", null, "当应用处于后台，或者手机息屏时，系统会限制应用的活动，我们建议您 进行以下操作")
              ]),
              vue.createVNode(lzFeatureList, { data: list })
            ],
            4
            /* STYLE */
          )
        ]);
      };
    }
  });
  const PagesAudioAndAlertSettingsCompletionSoundCompletionSound = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-dbef1e98"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/audioAndAlertSettings/completionSound/completionSound.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "vipMembership",
    setup(__props) {
      const navHeight = getApp().globalData.statusBarHeight + getApp().globalData.navHeight;
      const contentStyle = vue.computed(() => {
        return `
			top: ${navHeight}px;
			height: calc(100vh - ${navHeight}px)
		`;
      });
      const label = "升级Todo计划会员，畅想更多权益";
      const titleStyle = {
        fontSize: "36rpx"
      };
      const rightIconStyle = {
        width: "88rpx",
        height: "88rpx"
      };
      const labelStyle = {
        fontSize: "24rpx",
        fontFamily: "江城圆体-600W, 江城圆体",
        marginTop: "10rpx"
      };
      const vipLabelStyle = {
        fontSize: "24rpx",
        fontFamily: "江城圆体-600W, 江城圆体",
        color: "#999"
      };
      const membershipFeatures = [
        {
          title: "「数据云同步」",
          label: "自动同步数据到云端服务器",
          icon: "/static/images/userProfile/feedback.png",
          isRightIcon: false
        },
        {
          title: "主题样式",
          label: "多种主题，随心切换",
          icon: "/static/images/userProfile/evaluation.png",
          isRightIcon: false
        },
        {
          title: "周期事件",
          label: "设定周期事件，自动生成并保存账单",
          icon: "/static/images/userProfile/about.png",
          isRightIcon: false
        },
        {
          title: "分期事件",
          label: "设定分期事件，每期自动进行入账操作",
          icon: "/static/images/userProfile/feedback.png",
          isRightIcon: false
        },
        {
          title: "账单图片",
          label: "添加图片备注到账单中",
          icon: "/static/images/userProfile/feedback.png",
          isRightIcon: false
        },
        {
          title: "截图导入",
          label: "通过OCR识别账单截图并导入",
          icon: "/static/images/userProfile/about.png",
          isRightIcon: false
        }
      ];
      const vipTypes = vue.reactive([
        {
          name: "月会员",
          price: "7.9"
        },
        {
          name: "年会员",
          price: "49.0"
        },
        {
          name: "永久会员",
          price: "119.0"
        }
      ]);
      let vipCurrent = vue.ref(0);
      const vipTypesChange = (index) => {
        vipCurrent.value = index;
      };
      const pay = (type) => {
        $tips.toast('你选择的是"' + vipTypes[vipCurrent.value].name + '",支付方式为：' + type);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "about-wrap" }, [
          vue.createVNode(lzNavBar, {
            "left-icon": "",
            leftText: "高级会员"
          }),
          vue.createElementVNode(
            "view",
            {
              class: "about-content",
              style: vue.normalizeStyle(vue.unref(contentStyle))
            },
            [
              vue.createVNode(lzCell, {
                title: "Todo计划",
                radius: 20,
                height: 140,
                label,
                padding: [0, 20],
                rightIconStyle,
                "right-icon": "/static/images/common/logo.png",
                "title-style": titleStyle,
                labelStyle
              }, null, 8, ["right-icon"]),
              vue.createElementVNode("view", { class: "membership-features" }, [
                vue.createElementVNode("view", { class: "title-box" }, [
                  vue.createElementVNode("view", { class: "border-plc" }),
                  vue.createElementVNode("text", { class: "title-text" }, "会员功能")
                ]),
                vue.createVNode(lzFeatureList, {
                  data: membershipFeatures,
                  "margin-top": 6,
                  labelStyle: vipLabelStyle
                }),
                vue.createElementVNode("view", { class: "membership-features-type" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(vipTypes, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        key: index,
                        class: vue.normalizeClass(vue.unref(vipCurrent) == index ? "item item-active" : "item"),
                        onClick: ($event) => vipTypesChange(index)
                      }, [
                        vue.createElementVNode(
                          "text",
                          { class: "item-name" },
                          vue.toDisplayString(item.name),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "item-price" },
                          "￥" + vue.toDisplayString(item.price),
                          1
                          /* TEXT */
                        )
                      ], 10, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                vue.createElementVNode("view", { class: "membership-features-payment" }, [
                  vue.createElementVNode("button", {
                    class: "payment-methods-btn",
                    onClick: _cache[0] || (_cache[0] = ($event) => pay(0))
                  }, "微信支付"),
                  vue.createElementVNode("button", {
                    class: "payment-methods-btn",
                    onClick: _cache[1] || (_cache[1] = ($event) => pay(1))
                  }, "支付宝支付")
                ])
              ])
            ],
            4
            /* STYLE */
          )
        ]);
      };
    }
  });
  const PagesVipMembershipVipMembership = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5d5e5b24"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/vipMembership/vipMembership.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "loadingPage",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "wrap" }, [
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("image", {
              class: "loading-logo",
              src: "/static/images/habitBuildingSystem/corgi.png"
            }),
            vue.createElementVNode("view", { class: "progress-box" }, [
              vue.createVNode(lzProgress, {
                mode: "bottom",
                activeBackgroundColor: "linear-gradient(360deg, #F4CE69 0%, #F9DF95 100%)"
              })
            ])
          ])
        ]);
      };
    }
  });
  const PagesTabBarHabitBuildingSystemLoadingPageLoadingPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-aed5a8ed"], ["__file", "/Users/codelz/duanfay/qd_project/qudong-app/pages/tabBar/habitBuildingSystem/loadingPage/loadingPage.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/tabBar/index/index", PagesTabBarIndexIndex);
  __definePage("pages/tabBar/habitBuildingSystem/index/index", PagesTabBarHabitBuildingSystemIndexIndex);
  __definePage("pages/accountManagement/personalInformationDetails/personalInformationDetails", PagesAccountManagementPersonalInformationDetailsPersonalInformationDetails);
  __definePage("pages/audioAndAlertSettings/audioAndAlertSettings", PagesAudioAndAlertSettingsAudioAndAlertSettings);
  __definePage("pages/tabBar/calendar/calendar", PagesTabBarCalendarCalendar);
  __definePage("pages/tabBar/quadrants/quadrants", PagesTabBarQuadrantsQuadrants);
  __definePage("pages/tabBar/habitBuildingSystem/main", PagesTabBarHabitBuildingSystemMain);
  __definePage("pages/tabBar/userProfile/userProfile", PagesTabBarUserProfileUserProfile);
  __definePage("pages/aboutUs/aboutUs", PagesAboutUsAboutUs);
  __definePage("pages/accountManagement/emailLogin/emailLogin", PagesAccountManagementEmailLoginEmailLogin);
  __definePage("pages/accountManagement/registerAccount/registerAccount", PagesAccountManagementRegisterAccountRegisterAccount);
  __definePage("pages/accountManagement/changeAndRecoverPassword/changeAndRecoverPassword", PagesAccountManagementChangeAndRecoverPasswordChangeAndRecoverPassword);
  __definePage("pages/accountManagement/accountDeletion/accountDeletion", PagesAccountManagementAccountDeletionAccountDeletion);
  __definePage("pages/audioAndAlertSettings/completionSound/completionSound", PagesAudioAndAlertSettingsCompletionSoundCompletionSound);
  __definePage("pages/vipMembership/vipMembership", PagesVipMembershipVipMembership);
  __definePage("pages/tabBar/habitBuildingSystem/loadingPage/loadingPage", PagesTabBarHabitBuildingSystemLoadingPageLoadingPage);
  const _sfc_main = {
    globalData: {
      statusBarHeight: 0,
      // 状态导航栏高度
      navHeight: 0,
      // 总体高度
      navigationBarHeight: 0
      // 导航栏高度(标题栏高度)
    },
    onLaunch: function() {
      uni.hideTabBar();
      const system = uni.getSystemInfoSync();
      this.globalData.statusBarHeight = system.statusBarHeight;
      this.globalData.navHeight = system.system.indexOf("iOS") > -1 ? 44 : 48;
      formatAppLog("log", "at App.vue:24", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:27", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:30", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/codelz/duanfay/qd_project/qudong-app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
