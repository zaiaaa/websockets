import { serverHttp } from "./http";
import "./websocket"

serverHttp.listen(3000, () => console.log('Rodando na porta 3000'))
