/*!
 * PAGE: Dashboard
 * Dashmix - v2.2.0
 * @author pixelcave - https://pixelcave.com
 * Copyright (c) 2020
 */

!function(r) {
    var o= {}
    ;
    function a(t) {
        if(o[t])return o[t].exports;
        var e=o[t]= {
            i:t,
            l:!1,
            exports: {}
        }
        ;
        return r[t].call(e.exports, e, e.exports, a),
        e.l=!0,
        e.exports
    }
    a.m=r,
    a.c=o,
    a.d=function(r, o, t) {
        a.o(r, o)||Object.defineProperty(r, o, {
            enumerable: !0, get: t
        }
        )
    }
    ,
    a.r=function(r) {
        "undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r, Symbol.toStringTag, {
            value: "Module"
        }
        ),
        Object.defineProperty(r, "__esModule", {
            value: !0
        }
        )
    }
    ,
    a.t=function(r, o) {
        if(1&o&&(r=a(r)), 8&o)return r;
        if(4&o&&"object"==typeof r&&r&&r.__esModule)return r;
        var t=Object.create(null);
        if(a.r(t), Object.defineProperty(t, "default", {
            enumerable: !0, value: r
        }
        ), 2&o&&"string"!=typeof r)for(var e in r)a.d(t, e, function(o) {
            return r[o]
        }
        .bind(null, e));
        return t
    }
    ,
    a.n=function(r) {
        var o=r&&r.__esModule?function() {
            return r.default
        }
        :function() {
            return r
        }
        ;
        return a.d(o, "a", o),
        o
    }
    ,
    a.o=function(r, o) {
        return Object.prototype.hasOwnProperty.call(r, o)
    }
    ,
    a.p="",
    a(a.s=26)
}

( {
    26:function(r, o, a) {
        r.exports=a(27)
    }
    , 27:function(r, o) {
        function a(r, o) {
            for(var a=0;
            a<o.length;
            a++) {
                var t=o[a];
                t.enumerable=t.enumerable||!1, t.configurable=!0, "value"in t&&(t.writable=!0), Object.defineProperty(r, t.key, t)
            }
        }
        var t=function() {
            function r() {
                !function(r, o) {
                    if(!(r instanceof o))throw new TypeError("Cannot call a class as a function")
                }
                (this, r)
            }
            var o, t, e;
            return o=r, e=[ {
                key:"initChartsMain", value:function() {
                    Chart.defaults.global.defaultFontColor="#495057", Chart.defaults.scale.gridLines.color="transparent", Chart.defaults.scale.gridLines.zeroLineColor="transparent", Chart.defaults.scale.display=!1, Chart.defaults.scale.ticks.beginAtZero=!0, Chart.defaults.global.elements.line.borderWidth=0, Chart.defaults.global.elements.point.radius=0, Chart.defaults.global.elements.point.hoverRadius=0, Chart.defaults.global.tooltips.cornerRadius=3, Chart.defaults.global.legend.labels.boxWidth=12;
                    var r, o, a, t, e, n, l=jQuery(".js-chartjs-dashboard-earnings");
                    o= {
                        maintainAspectRatio:!1, scales: {
                            yAxes:[ {
                                ticks: {
                                    suggestedMax: 260
                                }
                            }
                            ]
                        }
                        , tooltips: {
                            intersect:!1, callbacks: {
                                label:function(r, o) {
                                    return" "+r.yLabel+" Sales"
                                }
                            }
                        }
                    }
                    , a= {
                        labels:["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], datasets:[ {
                            label: "This Year", fill: !0, backgroundColor: "rgba(130, 181, 75, .3)", borderColor: "transparent", pointBackgroundColor: "rgba(130, 181, 75, 1)", pointBorderColor: "#fff", pointHoverBackgroundColor: "#fff", pointHoverBorderColor: "rgba(130, 181, 75, 1)", data: [50, 210, 110, 90, 230, 130, 190, 75, 155, 120, 140, 230]
                        }
                        , {
                            label: "Last Year", fill: !0, backgroundColor: "rgba(233, 236, 239, 1)", borderColor: "transparent", pointBackgroundColor: "rgba(233, 236, 239, 1)", pointBorderColor: "#fff", pointHoverBackgroundColor: "#fff", pointHoverBorderColor: "rgba(233, 236, 239, 1)", data: [210, 150, 90, 220, 150, 216, 143, 150, 240, 230, 136, 150]
                        }
                        ]
                    }
                    , t= {
                        labels:["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], datasets:[ {
                            label: "This Year", fill: !0, backgroundColor: "rgba(130, 181, 75, .3)", borderColor: "transparent", pointBackgroundColor: "rgba(130, 181, 75, 1)", pointBorderColor: "#fff", pointHoverBackgroundColor: "#fff", pointHoverBorderColor: "rgba(130, 181, 75, 1)", data: [50, 210, 110, 90, 230, 130, 190, 75, 155, 120, 140, 230]
                        }
                        , {
                            label: "Last Year", fill: !0, backgroundColor: "rgba(233, 236, 239, 1)", borderColor: "transparent", pointBackgroundColor: "rgba(233, 236, 239, 1)", pointBorderColor: "#fff", pointHoverBackgroundColor: "#fff", pointHoverBorderColor: "rgba(233, 236, 239, 1)", data: [210, 150, 90, 220, 150, 216, 143, 150, 240, 230, 136, 150]
                        }
                        ]
                    }
                    ;
                    for(var d=[], i=0;
                    i<30;
                    i++)d[i]=29===i?"1 day ago":30-i+" days ago";
                    e= {
                        labels:d, datasets:[ {
                            label: "This Month", fill: !0, backgroundColor: "rgba(130, 181, 75, .3)", borderColor: "transparent", pointBackgroundColor: "rgba(130, 181, 75, 1)", pointBorderColor: "#fff", pointHoverBackgroundColor: "#fff", pointHoverBorderColor: "rgba(130, 181, 75, 1)", data: [50, 210, 110, 90, 230, 130, 190, 75, 155, 120, 140, 230, 50, 210, 110, 90, 230, 130, 155, 120, 140, 230, 50, 210, 110, 90, 230, 130, 190, 75]
                        }
                        , {
                            label: "Last Month", fill: !0, backgroundColor: "rgba(233, 236, 239, 1)", borderColor: "transparent", pointBackgroundColor: "rgba(233, 236, 239, 1)", pointBorderColor: "#fff", pointHoverBackgroundColor: "#fff", pointHoverBorderColor: "rgba(233, 236, 239, 1)", data: [210, 150, 90, 220, 150, 216, 143, 150, 136, 150, 210, 150, 90, 220, 150, 216, 240, 230, 136, 150, 210, 150, 90, 220, 150, 216, 143, 150, 240, 230]
                        }
                        ]
                    }
                    , n= {
                        labels:["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"], datasets:[ {
                            label: "This Week", fill: !0, backgroundColor: "rgba(130, 181, 75, .3)", borderColor: "transparent", pointBackgroundColor: "rgba(130, 181, 75, 1)", pointBorderColor: "#fff", pointHoverBackgroundColor: "#fff", pointHoverBorderColor: "rgba(130, 181, 75, 1)", data: [34, 42, 62, 78, 39, 83, 98]
                        }
                        , {
                            label: "Last Week", fill: !0, backgroundColor: "rgba(233, 236, 239, 1)", borderColor: "transparent", pointBackgroundColor: "rgba(233, 236, 239, 1)", pointBorderColor: "#fff", pointHoverBackgroundColor: "#fff", pointHoverBorderColor: "rgba(233, 236, 239, 1)", data: [130, 95, 125, 160, 187, 110, 143]
                        }
                        ]
                    }
                    , l.length&&(r=new Chart(l, {
                        type: "line", data: a, options: o
                    }
                    )), jQuery('[data-toggle="dashboard-chart-set-week"]').on("click", (function() {
                        r.data.labels=n.labels, r.data.datasets[0]=n.datasets[0], r.data.datasets[1]=n.datasets[1], r.update()
                    }
                    )), jQuery('[data-toggle="dashboard-chart-set-month"]').on("click", (function() {
                        r.data.labels=e.labels, r.data.datasets[0]=e.datasets[0], r.data.datasets[1]=e.datasets[1], r.update()
                    }
                    )), jQuery('[data-toggle="dashboard-chart-set-year"]').on("click", (function() {
                        r.data.labels=t.labels, r.data.datasets[0]=t.datasets[0], r.data.datasets[1]=t.datasets[1], r.update()
                    }
                    ))
                }
            }
            , {
                key:"init", value:function() {
                    this.initChartsMain()
                }
            }
            ], (t=null)&&a(o.prototype, t), e&&a(o, e), r
        }
        ();
        jQuery((function() {
            t.init()
        }
        ))
    }
}

);