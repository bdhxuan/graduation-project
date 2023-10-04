const config = {
    app: {
        port: process.env.PORT || 4000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/webbike"
    },
    JWTS: {
        secret: process.env.JWT_SECRET || "AFASJEJ35509NJKJNOU79GGBRRTYJQ355",
        expire: process.env.JWT_EXPIRE || "5d"
    },
    cookie: {
        ck_exprise: process.env.COOKIE_EPIRE || "5"
    },
    smpt: {
        smptm: process.env.SMPT_MAIL || "isabel.schimmel65@ethereal.email",
        smptp: process.env.SMPT_PASSWORD || "taeCqx8kKxTFGVYJHP",
        smpth: process.env.SMPT_HOST || "smtp.ethereal.email",
        smptport: process.env.SMPT_PORT || "587"
    },
    cloud: {
        cloud_name: process.env.CLOUDINARY_NAME || "ddqajwkuy",
        api_key: process.env.CLOUDINARY_API_KEY || "778153499139499",
        api_secret: process.env.CLOUDINARY_API_SECRET || "kh6VyHAOBMvzUXmCKaZpv3TF6mU",
    },
};


module.exports = config;