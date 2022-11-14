
import jwt_decode from "jwt-decode";

type DataToken = {
    data: {
        idUsuario: string;
    }
}

export class TokenDecode {
    private token: string;
    constructor(token: string) {
        this.token = token;
    }

    getIdUsuario = () => {
        const decoded = jwt_decode(this.token);
        const { idUsuario: idUsuaruiEncoded } = (decoded as DataToken).data;
        const buff = new Buffer(idUsuaruiEncoded, 'base64');
        const idUsuario = Number(buff.toString('ascii'));

        return idUsuario
    }
}