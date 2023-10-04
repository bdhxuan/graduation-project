class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    //tim kiem san pham
    search(){
        const keyword = this.queryStr.keyword 
        ? {
            description: {
                $regex: this.queryStr.keyword,
                $options: "i", //tim kiem khong phan biet kieu chu
            },
        }
        : {};

        this.query = this.query.find({...keyword});
        return this;
    }


    //loc san pham
    filter(){
        const queryCopy = {...this.queryStr}; //copy queryStr

        //xoa 1 so truong cho danh muc
        const removeFields = ["keyword", "page", "limit"];
            // console.log(queryCopy);
        removeFields.forEach((key) => delete queryCopy[key]); //xoa ra khoi queryCopy

        //loc gia va danh gia
        console.log(queryCopy);

        let queryStr = JSON.stringify(queryCopy); //tao chuoi truy van
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); //tao toan tu >, >=, <, <=


        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }


};

module.exports = ApiFeatures;