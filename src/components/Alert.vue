<template>
    <div id="mofity_page">
        <div v-if="isWarning" class="content">
            <div class="warning header">
                <span>警告</span>
            </div>
            <div class="input_area">
                <ul>
                    <li>
                        <div class="title">
                        </div>
                        <div class="right">
                            删除该项会同时删除所有引用该项的诗句，确定删除吗？
                        </div>
                    </li>
                </ul>
            </div>
            <div class="footer">
                <div class="buttons">
                    <div @click="cancel" class="footer_button cancel">取消</div>
                    <div @click="continueDelete" class="footer_button save">确定</div>
                </div>
            </div>
        </div>
        <div v-else class="content">
            <div class="header">
                <span>新增诗词</span>
            </div>
            <div class="input_area">
                <ul v-if="isPoems">
                    <li>
                        <div class="title">
                            作者：
                        </div>
                        <div class="right">
                            <input v-model="author" type="text" name="author" id="author" minlength="2" maxlength="10" onkeyup="value=value.replace(/[^\u4E00-\u9FA5][2,10]/g,'')"
onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))" placeholder="2~10个字之间，仅支持中文">
                        </div>
                    </li>
                    <li>
                        <div class="title">
                            诗句：
                        </div>
                        <div class="right">
                            <input v-model="verse" type="text" name="verse" id="verse" maxlength="10" onkeyup="value=value.replace(/[^\u4E00-\u9FA5][2,10]/g,'')"
onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))" placeholder="诗句，2~20个字之间">
                        </div>
                    </li>
                    <li>
                        <div class="title">
                            朝代：
                        </div>
                        <div class="right">
                            <select v-model="dynasty" name="" id="0">
                                <option v-for="(aa, ind) in origin2" :key="ind" :value="aa.dynasty">{{aa.dynasty}}</option>
                            </select>
                        </div>
                    </li>
                </ul>
                <ul v-else>
                    <li>
                        <div class="title">
                            朝代名：
                        </div>
                        <div class="right">
                            <input v-model="dynasty" @change="dynastyChange" type="text" name="author" id="dynasty_name" placeholder="请输入朝代">
                        </div>
                    </li>
                    <li v-if="isRepeat">
                        <div class="title">
                        
                        </div>
                        <div class="right" style="color:red">
                            朝代名不能重复
                        </div>
                    </li>
                </ul>
            </div>
            <div class="footer">
                <div class="buttons">
                    <div @click="cancel" class="footer_button cancel">取消</div>
                    <div @click="save" class="footer_button save"  :class="!isPoems &&!dynasty ? 'foridden':''">保存</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    /* .footer_button {

    } */
    
    #mofity_page {
        position: fixed;
        width: 100%;
        height: 100%;
        /* border: 1px solid #ccc; */
        background: transparent;
        display: flex;
        justify-content: center;
        /* align-items: center; */
        /* top: 150px; */
    }

    #mofity_page .content {
        width: 60%;
        height: 400px;
        border: 1px solid rgb(111, 233, 137);
        background: #000;
        display: flex;
        flex-direction: column;
        margin-top: 150px;
    }
    .header {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        height: 30px;
        line-height: 30px;
        background: rgb(111, 233, 137);
    }
    .warning {
        background: pink;
    }
    .header> span {
        /* display: inline-block; */
        margin-left: 10px;
        color: #000;
    }
    .warning>span {
        color: red;
    }
    .input_area {
        height: 70%;
    }
    .input_area ul{
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-top: 20px
    }
    .input_area ul li {
        display: flex;
        height: 60px;
        line-height: 60px;

    }
    .input_area ul li .title {
        width: 20%;
    }
    .input_area ul li .right {
        width: 80%;
        text-align: left;
    }
    .right input {
        width: 70%;
        height: 35px;
        border-radius: 5px;
        text-indent: 10px;
    }
    .right select {
        width: 40%;
        height: 35px;
        border-radius: 5px;

    }
    .right select option {
        height: 35px;
    }
    .footer {
        display: flex;
        justify-content: flex-end;
    }
    .footer .buttons {
        display: flex;
        width: 15%;
        justify-content: space-around;
        margin-right: 20px;
    }
    .footer .buttons .footer_button{
        border: .5px solid #ccc;
        width: 50px;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        cursor: pointer;
    }
    .footer .buttons .save {
        background: rgb(111, 233, 137);
    }
    .footer .buttons .foridden {
        cursor: none;
        background: #ccc;
    }
</style>
<script>
// import $ from "jquery"

export default {
    props: {
        toSunParam: Boolean,
        data1: Array,
        data2: Array,
        modifyValue: Object,
        type: Boolean,
    },
    data() {
        return {
            author: "",
            verse: "",
            dynasty: "",
            isPoems: this.toSunParam,
            isRepeat: false,
            origin1: this.data1,
            origin2: this.data2,
            modifyBeforeValue: this.modifyValue,
            isWarning: this.type,
        }
    },
    mounted() {
        this.dynasty = this.modifyBeforeValue.dynasty;
        if(this.isPoems) {
            this.verse = this.modifyBeforeValue.content;
            this.author = this.modifyBeforeValue.author;
        }
    },
    watch: {
        isPoems(val) {
            this.isPoems = val;
        },
        origin1(val) {
            this.origin1 = val;
        },
        origin2(val) {
            this.origin2 = val;
        },
        modifyBeforeValue(val){
            this.modifyBeforeValue = val;
        }
    },
    methods: {
        cancel() {
            // $("#mofity_page").hide();
            this.$emit("showAlert", false);
            this.empty();
        },
        empty() {
            this.author = "";
            this.verse = "";
            this.dynasty = "";
            this.isPoems = true;
            this.isRepeat = false;
            this.origin1 = [];
            this.origin2 = [];
            this.modifyBeforeValue = "";
            this.isWarning = false;
        },
        save() {
            // console.log(this.author,this.isRepeat)
            let type = this.modifyBeforeValue.dynasty ? "modify": "save";
            console.log(this.modifyBeforeValue.dynasty)
            if(this.isPoems) {
                this.$emit("showAlert", false);
                this.$emit(type,{
                    id: type === "save" ? this.origin1.length  + 1 : this.modifyBeforeValue.id,
                    author: this.author,
                    content: this.verse,
                    dynasty: this.dynasty,
                });
            } else {
                if(this.dynasty && !this.isRepeat) {
                    this.$emit("showAlert", false);
                    this.$emit(type,  {
                        id: type === "save" ? this.origin2.length  + 1 : this.modifyBeforeValue.id,
                        dynasty: this.dynasty,
                    });
                }
            }
            console.log({
                        id: type === "save" ? this.origin2.length  + 1 : this.modifyBeforeValue.id,
                        dynasty: this.dynasty,
                    })
            this.empty();
        },
        dynastyChange(e) {
            let currentValue = e.target.value,
                len = this.origin2.length;
            for(let i = 0; i < len; i ++) {
                const item = this.origin2[i];
                if(item.dynasty === currentValue) {
                    this.isRepeat = true;
                    break;
                } else {
                    this.isRepeat = false;
                }
            }
            // this.empty();
        },
        continueDelete() {
            this.$emit("showAlert", false);
            this.$emit("deleteDynasy", this.modifyBeforeValue);
            this.empty();
        }
    }
}
</script>