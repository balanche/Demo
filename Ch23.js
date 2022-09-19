let book = {
    title: "JavaScript",
    authors: [
        "Nicholas",
        "Matt"
    ],
    edition: 4,
    year: 2017,
    publish: undefined,
    releaseDate: new Date(2017, 11, 1),

    getTitle: function(){
        return this.title
    }
};

function testJSON() {
    /**
     * 序列化：obj - str
     */
    let commonStr = JSON.stringify(book)
    console.log(commonStr)// {"title":"JavaScript","authors":["Nicholas","Matt"],"edition":4,"year":2017,"releaseDate":"2017-11-30T16:00:00.000Z"}

    let customerStr1 = JSON.stringify(book, ["title","authors"], 4)
    console.log(customerStr1)
    // {
    //     "title": "JavaScript",
    //     "authors": [
    //         "Nicholas",
    //         "Matt"
    //     ]
    // }

    let customerStr2 = JSON.stringify(book, (key,value) => {
        switch (key) {
            case "authors":
                return value.join("&")
            case "edition":
                return undefined
            default:
                return value;
        }
    }, "--")
    console.log(customerStr2)
    // {
    //     --"title": "JavaScript",
    //     --"authors": "Nicholas & Matt",
    //     --"year": 2017,
    //     --"releaseDate": "2017-11-30T16:00:00.000Z"
    // }

    /**
     * 解析：str - obj
     */
     let customerStr3 = JSON.stringify(book, (key,value) => {
        switch (key) {
            case "authors":
                return value.join("&")
            case "edition":
                return undefined
            default:
                return value;
        }
    })
    let commonObj = JSON.parse(customerStr3)
    console.log(commonObj)// {title: 'JavaScript', authors: 'Nicholas & Matt', year: 2017, releaseDate: '2017-11-30T16:00:00.000Z'}

    let customerObj = JSON.parse(customerStr3, (key, value) => {
        switch (key) {
            case "authors":
                return value.split("&")
            case "edition":
                return 4
            case "releaseDate":
                return new Date(value)
            default:
                return value;
        }
    })
    console.log(customerObj)
    // {title: 'JavaScript', authors: Array(2), year: 2017, releaseDate: Fri Dec 01 2017 00:00:00 GMT+0800 (中国标准时间)}
}

testJSON()