import request from "@/axios/axiosInstance";

export default {
    login:(username,password)=>{
        return request({
            url: `/user/login?username=${username}&password=${password}`,
            method: 'POST',
        })
    },
    getAllMachines:()=>{
        return request({
            url: `/device/all`,
            method: 'GET'
        })
    },
    getMachines:()=>{
        return request({
            url: `/member/queryByMemberId`,
            method: `GET`
        })
    },
    getEnvirData:(deviceId)=>{
        return request({
            url: `/environmentData/queryDataByDevice/${deviceId}`,
            method: 'GET'
        })
    },
    getImages:(deviceId)=>{
        return request({
            url: `environmentData/queryAllImageByMemberAndDevice/${deviceId}`,
            method: 'GET'
        })
    },
    getPosition:(deviceId)=>{
        return request({
            url: `{{APIURL}}/machines/${deviceId}/status`,
            method: 'GET'
        })
    },
    queryDataByDevice: (deviceId) => {
        return request({
            url: `environmentData/queryDataByDevice/${deviceId}`,
            method: 'GET',
        })
    },



// // 数据对象格式
// let deviceData = {
//   "createdDate": "",
//   "lastModifiedDate": "",
//   "customName": "consequat",
//   "typeName": "ipsum ",
//   "ipAddress": "do minim en",
//   "status": 1,
//   "city": "enim dolore",
//   "address": "sit nostrud",
//   "buyDate": "",
//   "deliveryDate": "",
//   "acceptanceDate": "",
//   "putIntoUseDate": "",
//   "description": "reprehenderit in voluptate id",
//   "coordinate": "do amet consectetur Duis",
//   "entityId": {}
// };
    addDevice: (device) => {
        return request({
            url: `member/addDevice`,
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
            },
            data: device
        });
    },


    queryByMemberId: () => {
        return request({
            url: `member/queryByMemberId`,
            method: 'GET'
        });
    },

    pageByMember: () => {
        return request({
            url: `device/pageByMember?page=0&size=10&sort=id`,
            method: 'GET',
        });
    },

// TODO: ??
    // createImage: (filePath, deviceId) => {
    //     const FormData = require('form-data');
    //     let data = new FormData();
    //     const fs = require('fs');
    //     data.append('file', fs.createReadStream(filePath));

    //     return request({
    //         url: `environmentData/createImage?deviceId=${deviceId}`,
    //         method: 'POST',
    //         headers: { 
    //             'Content-Type': 'multipart/form-data', 
    //             ...data.getHeaders()
    //         },
    //         data: data
    //     });
    // }
}