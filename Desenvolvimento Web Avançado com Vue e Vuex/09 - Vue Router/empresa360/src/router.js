import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '@/views/Home.vue'
// import Login from '@/views/Login.vue'
// import Site from '@/views/Site.vue'
// import PaginaNaoEncontrada from '@/views/PaginaNaoEncontrada.vue'
// import Servicos from '@/components/servicos/Servicos.vue'
// import Servico from '@/components/servicos/Servico.vue'
// import Opcoes from '@/components/servicos/Opcoes.vue'
// import Indicadores from '@/components/servicos/Indicadores.vue'
// import Dashboard from '@/components/dashboard/Dashboard.vue';
// import DashboardRodape from '@/components/dashboard/DashboardRodape.vue';
// import Vendas from '@/components/vendas/Vendas.vue'
// import VendasPadrao from '@/components/vendas/VendasPadrao.vue'
// import Leads from '@/components/vendas/Leads.vue'
// import Lead from '@/components/vendas/Lead.vue'
// import Contratos from '@/components/vendas/Contratos.vue'

// Lazy loading
const Contratos = () => import(/* webpackChunckName: "vendas" */ '@/components/vendas/Contratos.vue')
const Dashboard = () => import('@/components/dashboard/Dashboard.vue')
const DashboardRodape = () => import('@/components/dashboard/DashboardRodape.vue')
const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')
const Site = () => import('@/views/Site.vue')
const PaginaNaoEncontrada = () => import('@/views/PaginaNaoEncontrada.vue')
const Servicos = () => import('@/components/servicos/Servicos.vue')
const Servico = () => import('@/components/servicos/Servico.vue')
const Opcoes = () => import('@/components/servicos/Opcoes.vue')
const Indicadores = () => import('@/components/servicos/Indicadores.vue')
const Vendas = () => import(/* webpackChunckName: "vendas" */ '@/components/vendas/Vendas.vue')
const VendasPadrao = () => import(/* webpackChunckName: "vendas" */ '@/components/vendas/VendasPadrao.vue')
const Leads = () => import(/* webpackChunckName: "vendas" */ '@/components/vendas/Leads.vue')
const Lead = () => import(/* webpackChunckName: "vendas" */ '@/components/vendas/Lead.vue')

const routes = [
    {
        path: '/',
        component: Site,
        meta: { requerAutorizacao: false },
    },
    {
        path: '/home',
        meta: { requerAutorizacao: true },
        alias: '/app',
        component: Home,
        children: [
            { 
                path: 'vendas',
                component: Vendas, 
                children: [
                    {
                        path: 'leads',
                        component: Leads,
                        name: 'leads',
                        beforeEnter() {
                            // beforeEnter(to, from, next)
                            // Essa guarda de rota funciona dentro da rota na qual ela foi definida
                            console.log('Guarda de rota beforeEnter:', 'Verificar se o usuário tem a permissão de carregar a rota')
                        },
                    },
                    {
                        path: 'leads/:id/:outroParametro',
                        props: true,
                        /*
                        props: {
                            id: 4,
                            outroParametro: 'pt-br'
                        },
                        */
                       /*
                       props: route => {
                            console.log('Rota ativa:', route)

                            let teste = route.query.idioma ? route.query.idioma : route.params.outroParametro

                            console.log(teste)
                            //?idioma=pt-br
                            // implementando uma lógica para definir as props que serão submetidas para o componente roteado

                            return {
                                id: parseInt(route.params.id) + 1,
                                outroParametro: teste
                            }
                        },
                       */
                        alias: [
                            '/l:id/:outroParametro',
                            'pessoa/:id/:outroParametro',
                            '/:id/:outroParametro'
                        ],
                        component: Lead,
                        name: 'lead'
                    },
                    {
                        path: 'contratos',
                        component: Contratos,
                        name: 'contratos'
                    },
                    {
                        path: '',
                        component: VendasPadrao,
                        name: 'vendas'
                    },
                ]
            },
            {
                path: 'servicos',
                component: Servicos,
                name: 'servicos',
                children: [
                    {
                        path: ':id',
                        props: {
                            default: true,
                            indicadores: true,
                            opcoes: true,
                        },
                        alias: '/s/:id',
                        name: 'servico',
                        components: {
                            default: Servico,
                            opcoes: Opcoes,
                            indicadores: Indicadores,
                        },
                    },
                ]
            },
            {
                path: 'dashboard', 
                components: {
                    default: Dashboard,
                    rodape: DashboardRodape,
                }
            },
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: { requerAutorizacao: false },
    },
    {
        path: '/redirecionamento-1',
        redirect: '/home/servicos',
    },
    {
        path: '/redirecionamento-2',
        redirect: { name: 'leads' },
    },
    {
        path: '/redirecionamento-3',
        redirect: '/home/vendas',
    },
    {
        path: '/redirecionamento-4',
        redirect: { name: 'vendas' },
    },
    {
        path: '/redirecionamento-5',
        redirect: to => {
            // podemos programar algo antes do redirecionamento ser efetivado
            console.log(to)

            // return '/home/vendas'
            return { name: 'vendas' }
        },
    },
    {
        // path: '*',
        path: '/:catchAll(.*)*',
        component: PaginaNaoEncontrada
    },
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        // return { left: 150, top: 150 } // left = x; top = y

        if(savedPosition) {
            return savedPosition
        }

        if(to.hash) {
            return { el: to.hash } // to.hash deve corresponder a um id de elemento HTML 
        }

        return { left: 0, top: 0 } // left = x; top = y

    },
    routes, // routes: routes,
})

router.beforeEach(() => {
    // console.log('Origem:', from)
    // console.log('Destino:', to)
    // verificar se o usuário está autorizado a acessar a rota

    // if(to.meta.requerAutorizacao) {
    //     console.log('Validar o acesso')
    // }
    // else {
    //     console.log('Apenas seguir a navegação')
    // }

    console.log('Guarda de rota global beforeEach:', 'Método executado antes do acesso a rota destino')
})

router.afterEach(() => {
    // console.log('Origem:', from)
    // console.log('Destino:', to)
    console.log('Guarda de rota global afterEach:', 'Método executado após a conclusão da navegação')
}) 

router.beforeResolve(() => {
    console.log('Guarda Global before resolve:', 'É executada por último dentre as rotas que são do tipo before!')
})
export default router