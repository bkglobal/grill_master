import { jsonValidator } from "../../validations/validator";
import {analyseGrillManager, prepareGrillData, transformRemainingData} from "../../services/grill-service";
import data from "./data";
class AppController {

    constructor() {
        // Data initialization
        this.grillData = {
            data: null,
            dataToDisplay: null,
            remaining_data: null,
            error: null,
            data_string: '',
        };
    }

    renderGrill(req, res, next) {
        try {
            return res.render('app', this.grillData)
        } catch (error) {
            return next(error);
        }
    }

    saveGrillData(req, res, next) {
        try {
            // Parse JSON comming from Textarea and check either it is valid or not ###
            const data = JSON.parse(req.body.data);
            this.grillData.data_string = JSON.stringify(data,  null, '\t');
            const { isValid, message } = jsonValidator(data);
            if (!isValid) {
                this.grillData.error = { message };
                return res.redirect('/');
            }

            /*
                There are two Indexing
                1- Item index   : It is the index of every item in grillItems.
                2- Id : When mapping the data according to counts each item has its own unique index.
            */
            let grillData = prepareGrillData(data.grill.grillItems.map((e, index) => ({...e, itemIndex: index+1})));
            grillData = grillData.map((e, index) => ({...e, id: index+1}));  
            
            let result = analyseGrillManager(data.grill.width, data.grill.height, grillData);
            let resultIds = result.map(e => e.id);

            // Transforming data according to counts.
            let remaning = transformRemainingData(grillData.filter(e => !(resultIds.includes(e.id))));
            this.grillData.data = data;
            this.grillData.dataToDisplay = result;
            this.grillData.remaining_data = remaning;
            this.grillData.error = null;
            this.grillData.data_string = JSON.stringify(data,  null, '\t');

            return res.redirect('/');
        } catch (error) {
            this.grillData.error = { message: 'Invalid Schema' };
            this.grillData.data_string = req.body.data;
            return res.redirect('/');
        }
    }
}

export default (new AppController());