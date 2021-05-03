<template>
    <div id="home">
        <!-- <h1>句子管理模块</h1> -->
        <div class="header">
            <ul class="box">
                <li class="can_active_font can_click">文本处理</li>/
                <li class="can_active_font can_click">句子</li>/
                <li class="active_font can_click">诗词</li>
            </ul>
        </div>
        <div class="content">
            <ul class="menu">
                <li @click="changeFun1" class="active_font_weight can_click">诗词</li>
                <li @click="changeFun2" class="can_click">朝代</li>
            </ul>
            <ul id="poems" v-if="isPoems" class="table">
                <li class="row first_row">
                    <div class="column">#</div>
                    <div class="column">内容</div>
                    <div class="column">朝代</div>
                    <div class="column">作者</div>
                    <div class="column">操作</div>
                </li>
                <li v-for="(item, index) in pageShow.data" :key="index" class="row">
                    <div class="column">{{item.id}}</div>
                    <div class="column">{{item.content}}</div>
                    <div class="column">{{item.dynasty}}</div>
                    <div class="column">{{item.author}}</div>
                    <div class="column">
                        <span @click="modifyMessage(item.id-1)" class="operation modify active_line can_click">修改</span><span @click="deleteItem(item.id-1)" class="operation delete active_line can_click">删除</span>
                    </div>
                </li>
                <div class="change_page">
                    <ul class="can_click change_page_buttons">
                        <li>&lt;&lt;</li>
                        <li @click="changePage(inde)" v-for="inde in pageShow.allPage" :key="inde" :class="pageShow.currentPage===inde?'active_page_button':''">{{inde}}</li>
                        <li>&gt;&gt;</li>
                    </ul>
                </div>
                <div class="new_add">
                    <div @click="newAdd" class="can_click button_new_add">
                        新增
                    </div>
                </div>
            </ul>
            <ul id="dynasty" v-else class="table">
                <li class="row first_row">
                    <div class="column">ID</div>
                    <div class="column">朝代名称</div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column">操作</div>
                </li>
                <li v-for="(item, index) in pageShow.data" :key="index" class="row">
                    <div class="column">{{item.id}}</div>
                    <div class="column">{{item.dynasty}}</div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column">
                        <span @click="modifyMessage(item.id-1)" class="operation modify active_line can_click">修改</span><span @click="deleteItem(item.id-1)" class="operation delete active_line can_click">删除</span>
                    </div>
                </li>
                <div class="change_page">
                    <ul class="can_click change_page_buttons">
                        <li>&lt;&lt;</li>
                        <li @click="changePage(inde)" v-for="inde in pageShow.allPage" :key="inde" :class="pageShow.currentPage===inde?'active_page_button':''">{{inde}}</li>
                        <li>&gt;&gt;</li>
                    </ul>
                </div>
                <div class="new_add">
                    <div @click="newAdd" class="can_click button_new_add">
                        新增
                    </div>
                </div>
            </ul>
        </div>
        <Alert :type="isWarning" v-if="isShowAlert" :toSunParam="isPoems" @showAlert="showAlert" @save="save" @modify="modifyList" @deleteDynasy="continueDelete" :data1="poemlist" :data2="dynastyList" :modifyValue="modifyValue"></Alert>
    </div>
</template>
<style>
    *{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    #home {
        background: #000;
        color: #fff;
        height: 750px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border: .5px solid #ccc;
    }
    #home h1{
        color: rgb(111, 233, 137);
    }
    #home>.header {
        width: 100%;
        height: 50px;
    }
    #home>.header>.box {
        border: .5px solid #ccc;
        display: flex;
        height: 100%;
        line-height: 50px;
        padding: 0 20px;
    }
    #home>.header>.box>li{
        margin: 0 20px;
    }
    .can_click {
        cursor: pointer;
    }
    .active_font {
        color: rgb(161, 162, 163);
    }
    .can_active_font {
        color: rgb(111, 233, 137);
    }
    .active_line {
        text-decoration: underline;
    }
    .active_font_weight {
        text-decoration: underline;
        font-weight: 800;
    }
    #home>.content {
        display: flex;
        justify-content: space-around;
        height: 700px;
        margin-top: 10px;
    }
    #home>.content>.menu {
        width: 20%;
        height: 95%;
        border: .5px solid #ccc;
        margin-right: 20px;
        padding: 10px;
        text-align: left;
    }
    #home>.content>.menu>li {
        line-height: 30px;
    }
    #home>.content>.table {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        height: 95%;
        border: .5px solid #ccc;
        padding-top: 20px;
    }
    
    #home>.content>.table>.row {
        display: flex;
        width: 94%;
        height: 30px;
        border-bottom: .5px solid #ccc;
    }
    #home>.content>.table>.first_row{
        border-top: .5px solid #ccc;
        background: rgb(70, 69, 69);
    }
    #home>.content>.table>.row>.column {
        text-align: left;
        line-height: 30px;
    }
    #home>.content>.table>.row>.column:nth-of-type(1) {
        width: 15%;
        text-align: center;
        /* width: 100%;
        display: flex;
        justify-content: space-between; */
    }

    #home>.content>.table>.row>.column:nth-of-type(2) {
        width: 35%;
    }
    #home>.content>.table>.row>.column:nth-of-type(3) {
        width: 20%;
    }
    #home>.content>.table>.row>.column:nth-of-type(4) {
        width: 15%;
    }
    #home>.content>.table>.row>.column:nth-of-type(5) {
        width: 15%;
        display: flex;
        justify-content: space-around;
    }
    #home>.content>.table>.row>.column:nth-of-type(5)>.modify{
        color: rgba(0, 0, 255, 0.644);
    }
    #home>.content>.table>.row>.column:nth-of-type(5)>.delete{
        color: red;
    }
    #home>.content>.table>.change_page {
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin: 40px auto;
        display: flex;
        justify-content: center;
    }
    #home>.content>.table>.change_page>.change_page_buttons {
        display: flex;
    }
    #home>.content>.table>.change_page>.change_page_buttons>li {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: .5px solid #ccc;
        color: rgb(111, 233, 137);
    }
    #home>.content>.table>.change_page>.change_page_buttons li:first-child {
        border-radius: 10px 0 0 10px;
    }
    #home>.content>.table>.change_page>.change_page_buttons li:last-child {
        border-radius: 0 10px 10px 0;
    }
    #home>.content>.table>.change_page>.change_page_buttons .active_page_button {
        color: #000;
        background: rgb(111, 233, 137);
    }
    #home>.content>.table>.new_add {
        width: 94%;
        display: flex;
        justify-content: flex-end;
    }
    #home>.content>.table>.new_add>.button_new_add {
        width: 60px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #000;
        background: rgb(111, 233, 137);
        border: .5px solid #ccc;
        border-radius: 3px;
    }
</style>
<script>
import $ from "jquery"
import Alert from "./Alert"
export default {
    components: {
        Alert,
    },
    data() {
        return {
            isPoems: true,
            isShowAlert: false,
            modifyValue: {},
            isWarning: false,
            poemlist : [
                {
                    id: 1,
                    content: "床前明月光，疑是地上霜",
                    dynasty: "唐",
                    author: "李白",
                },
                {
                    id: 2,
                    content: "床前明月光，疑是地上霜",
                    dynasty: "唐",
                    author: "李白",
                },
                {
                    id: 3,
                    content: "床前明月光，疑是地上霜",
                    dynasty: "唐",
                    author: "李白",
                },
                {
                    id: 4,
                    content: "床前明月光，疑是地上霜",
                    dynasty: "唐",
                    author: "李白",
                },
                {
                    id: 5,
                    content: "床前明月光，疑是地上霜",
                    dynasty: "唐",
                    author: "李白",
                },
                {
                    id: 6,
                    content: "床前明月光，疑是地上霜",
                    dynasty: "唐",
                    author: "李白",
                },
                {
                    id: 7,
                    content: "明月几时有，把酒问青天",
                    dynasty: "宋",
                    author: "苏轼",
                },
                {
                    id: 8,
                    content: "风急天高猿啸哀，渚清沙白鸟飞回",
                    dynasty: "唐",
                    author: "杜甫",
                }
                ,{
                    id: 9,
                    content: "千里莺啼绿映红，水村山郭酒旗风",
                    dynasty: "唐",
                    author: "杜牧",
                },
                {
                    id: 10,
                    content: "人生自古谁无死？留取丹青照汗青",
                    dynasty: "宋",
                    author: "文天祥",
                },
                {
                    id: 11,
                    content: "千里莺啼绿映红，水村山郭酒旗风",
                    dynasty: "唐",
                    author: "杜牧",
                },
                {
                    id: 12,
                    content: "人生自古谁无死？留取丹青照汗青",
                    dynasty: "宋",
                    author: "文天祥",
                },
            ],
            dynastyList: [
                {
                    id: 1,
                    dynasty: "唐"
                },
                {
                    id: 2,
                    dynasty: "宋"
                },
                {
                    id: 3,
                    dynasty: "元"
                }
            ],
            pageShow: {
                pageIndex: 1,
                pageSize: 5,
                total: 0,
                allPage: 0,
                data: [],
            }
        }
    },
    mounted() {
        if(this.isPoems) {
            this.pageShow = this.dataPageFormat(this.poemlist);
        } else {
            this.pageShow = this.dataPageFormat(this.dynastyList);
        }
    },
    methods: {
        newAdd() {
            this.showAlert(true);
            // if(this.isPoems) {
                this.modifyValue = {};
            // } else {
            //     this.modifyValue = {};
            // }
        },
        changeFun1(e) {
            this.isPoems = true;
            $(".menu li").removeClass("active_font_weight");
            $(e.target).addClass("active_font_weight");
            if(this.isPoems) {
                this.pageShow = this.dataPageFormat(this.poemlist);
            } else {
                this.pageShow = this.dataPageFormat(this.dynastyList);
            }
        },
        changeFun2(e) {
            this.isPoems = false;
            $(".menu li").removeClass("active_font_weight");
            $(e.target).addClass("active_font_weight");
            if(this.isPoems) {
                this.pageShow = this.dataPageFormat(this.poemlist);
            } else {
                this.pageShow = this.dataPageFormat(this.dynastyList);
            }
        },
        showAlert(isShow) {
            this.isShowAlert = isShow;
        },
        save(param) {
            if(!this.isPoems) {
                this.dynastyList.push(param);
            } else {
                this.poemlist.push(param);
            }
            this.updatePage();
        },
        modifyMessage(index) { //修改列表
            this.showAlert(true);
            console.log(index);
            if(this.isPoems) {
                this.modifyValue = this.poemlist[index];
            } else {
                this.modifyValue = this.dynastyList[index];
            }
        },
        deleteItem(index) { // 删除
            if(this.isPoems) {
                this.poemlist.splice(index, 1);
                this.poemlist.forEach((item,index)=> {
                    item.id = index + 1;
                })
            } else {
                this.isWarning = true;
                this.showAlert(true);
                this.modifyValue = this.dynastyList[index];
                // this.dynastyList.splice(index, 1);
                // this.dynastyList.forEach((item,index)=> {
                //     item.id = index + 1;
                // })
            }
            this.updatePage();
        },
        continueDelete(param) { // 继续删除朝代
            let a = this.dynastyList.splice(param.id-1, 1);
            this.dynastyList.forEach((item,index)=> {
                item.id = index+1;
            })
            let [obj] = a;
            let arr = [];
            let len = this.poemlist.length;
            for(let i = 0; i < len; i ++) {
                const item = this.poemlist[i];
                if(item.dynasty !== obj.dynasty) {
                    arr.push(item);
                }
            }
            arr.forEach((item, index) => {
                item.id = index + 1;
            })
            this.poemlist = arr;
            this.isWarning = false;
            this.updatePage();
        },
        modifyList(param) { // 修改某一行
            if(this.isPoems) {
                this.poemlist.forEach((item) => {
                    if(item.id === param.id) {
                        item = param;
                        this.poemlist.splice(item.id-1,1,param);
                    }
                })
            } else {
                this.dynastyList.forEach((item) => {
                    if(item.id === param.id) {
                        item = param;
                        this.dynastyList.splice(item.id-1,1,param);
                    }
                })
            }
            this.updatePage();
        },
        dataPageFormat(arr,currentPage=1, pageIndex=1,pageSize=5) {
            let newArr = [],
                total = arr.length,
                allPage = Math.ceil(arr.length/pageSize),
                end = currentPage * pageSize > total?total:currentPage*pageSize;
            for(let i = (currentPage-1) * pageSize; i < end;i++ ) {
                newArr.push(arr[i]);
            }
            return {
                pageIndex,
                pageSize,
                allPage,
                total,
                currentPage,
                data: newArr
            }
        },
        changePage(index) {
            if(this.isPoems) {
                this.pageShow = this.dataPageFormat(this.poemlist,index);
            } else {
                this.pageShow = this.dataPageFormat(this.dynastyList,index);
            }
        },
        updatePage(currentPage=this.pageShow.currentPage) {
            if(this.isPoems) {
                this.pageShow = this.dataPageFormat(this.poemlist, currentPage);
            } else {
                this.pageShow = this.dataPageFormat(this.dynastyList, currentPage);
            }
        }
    }
}
</script>