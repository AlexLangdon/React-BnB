import DatauriParser from "datauri/parser";
import path from "path";
const parser = new DatauriParser();

function datauri(file: Express.Multer.File): DatauriParser {
    return parser.format(path.extname(file.originalname).toString(), file.buffer);
}

export default datauri;
    