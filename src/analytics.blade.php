<div class="fixed flex-center inset-x-0 bottom-0 w-full p-2 sm:p-8 z-10" x-data="analytics()"
    x-init="init({id: 'UA-140893710-2', store: 'storage', name:'cpes-api-tracking', test: false})" x-show="ask" x-cloak>
    <div class="w-full max-w-4xl bg-secondary rounded-md shadow-lg border border-secondary-dark-1 px-8 py-4">
        <template x-if="!confirmed">
            <div class="flex items-center">
                <div class="w-3/4 text-white font-normal leading-snug">
                    Zur Reichweitenmessung setzen wir Cookies ein, damit wir einfach nachvollziehen können, wie viele Besucher unsere Webseite Craftplaces Api aufsuchen. Das hilft
                    uns
                    auch, unser Angebot weiter zu verbessern und mehr auf die Bedürfnisse anzupassen.
                </div>
                <div class="text-center w-1/4 ml-4">
                    <button class="btn btn--primary border-2 border-white text-sm m-2" @click="accept()">OK</button>
                    <button class="text-xs text-white font-bold m-2" @click="deny()">Ablehnen</button>
                </div>
            </div>
        </template>
        <template x-if="confirmed">
            <div class="text-white text-xl text-center font-bold leading-snug" x-transition:enter="transition ease-out duration-500"
                x-transition:enter-start="opacity-0 transform scale-75" x-transition:enter-end="opacity-100 transform scale-100">
                Vielen Dank für Deine Unterstützung...
            </div>
        </template>
    </div>
</div>
<style>
[x-cloak] {
    display: none;
}
</style>