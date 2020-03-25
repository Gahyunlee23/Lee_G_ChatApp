export default {
    props: ['msg'],

    template: `
        <p class="new-message" :class="{ 'my-message' : matchedID }">
            <span>{{msg.message.name}} says:</span>
            {{msg.message.content}}
        </p>
    `,

    data: function() {
        // nothing here yet, but there will be 
        return { 
            matchedID: this.$parent.socketID == this.msg.id 
        }
    }
}