<template>
    <footer>

        {{footerText}}


    </footer>
</template>

<script>
    export default {
        name: "footer",
        data(){
            return{
                footerText:'Copyright call upon Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem doloremque doloribus eius error, est et eveniet molestiae officiis omnis recusandae!'
            }
        }
    }
</script>

<style scoped>

    footer{
        background-color: limegreen;
        color: white;
        padding: 20px;
        text-align: center;
    }

</style>