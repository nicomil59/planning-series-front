<template>
    <div class="card card-program">
        <div class="row g-0 card-wrapper">
            <div class="col-md-4 d-flex card-left">
                <span class="card-day">{{ formatDay(program.schedule)}}</span>
                <span class="card-date">{{ formatDate(program.schedule)}}</span>
                <span class="card-hour">{{ formatHour(program.schedule)}}</span>
            </div>
            <div class="col-md-8 card-right">
                <div class="card-body card-content">
                    <div class="card-content-main">
                        <h4 class="card-title card-program-title">{{ program.title }}</h4>
                        <h5 class="card-title card-program-season">{{ program.season }}</h5>
                    </div>
                    <div class="card-text card-platform"><span>{{ program.platform }}</span></div>
                    <div class="card-countries">
                        <span v-for="(country) in program.countries" :key="country"
                            class="card-text">{{ country }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    moment.locale('fr');

    export default {
        name: "ProgramItem",
        props: {
            program: Object
        },
        data() {
            return {

            }
        },
        methods: {
            formatDay(time) {
                return moment(time).format('ddd').slice(0, 3)
            },
            formatDate(time) {
                return moment(time).format('DD') + '/' + moment(time).format('MM')
            },
            formatHour(time) {
                return moment(time).format('LT')
            },
        }
    }
</script>

<style scoped>
    .card-program {
        border-radius: 20px;
        max-width: 900px;
        border: 0;
        position: relative;
    }

    .card:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    p {
        padding: 0 !important;
    }

    .card-wrapper {
        padding: 20px 0 20px 20px;
        height: 156px;
        display: flex;
        align-content: center;
    }

    .card-left {
        background: #CAF0F8;
        border-radius: 10px;
        height: 132px;
        width: 152px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        align-self: center;
        color: #03045E;
    }

    .card-right {
        width: calc(100% - 152px);
    }

    .card-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .card-content-main {
        display: flex;
        flex-direction: column;
    }

    .card-day,
    .card-hour {
        font-size: 20px;
        font-weight: 500;
    }

    .card-date {
        font-size: 36px;
        font-weight: 700;
    }

    .card-program-title {
        font-size: 30px;
        font-weight: 700;
        color: #03045E;
    }

    .card-program-season {
        font-size: 22px;
        font-weight: 500;
        color: #696969;
    }

    .card-platform {
        font-size: 21px;
        font-weight: 500;
        text-transform: uppercase;
        color: #0077B6;
        text-align: end;
    }

    .card-countries {
        position: absolute;
        right: 15px;
        bottom: 10px;
    }

    .card-countries span {
        color: #03045E;
    }

    .card-countries span:not(:first-child)::before {
        content: ' | ';
    }

    @media screen and (max-width: 768px) {
        .card-wrapper {
            display: block;
            padding-right: 20px;
        }

        .card-left {
            width: 100%;
            height: 40px;
            flex-direction: row;
            gap: 10px;
        }

        .card-right {
            width: 100%;
        }

        .card-date {
            font-size: 26px;
        }

        .card-content-main {
            width: 100%;
        }

        .card-program-title {
            font-size: 28px;
        }

        .card-countries {
            display: none;
        }

    }

    @media screen and (max-width: 576px) {
        .card-left {
            width: 100%;
            height: 35px;
            flex-direction: row;
            gap: 10px;
        }

        .card-right {
            width: 100%;
        }

        .card-date {
            font-size: 24px;
        }

        .card-day,
        .card-hour {
            font-size: 18px;
        }


        .card-program-title {
            font-size: 20px;
        }

        .card-program-season {
            font-size: 18px;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .card-platform {
            font-size: 18px;
        }

    }
</style>