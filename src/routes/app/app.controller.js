import { jsonValidator } from "../../validations/validator";
import {analyseGrillManager, getPreparedData, prepareGrillData, transformRemainingData} from "../../services/grill-service";
import data from "./data";
class AppController {

    constructor() {
        this.multi = 3;
        this.grillData = {
            data: null,
            dataToDisplay: null,
            remaining_data: null,
            error: null,
            data_string: '',
        };
    }

    myfunc(req, res) {
        let grillData = prepareGrillData(data.grill.grillItems);
        grillData = grillData.map((e, index) => ({...e, id: index+1}));
        let result = analyseGrillManager(500, 500, grillData);
        let resultIds = result.map(e => e.id);

        let remaining = grillData.filter(e => !(resultIds.includes(e.id)));
        return res.status(200).send({success: true, grillData, result, resultIds, remaining});


        console.log(result);
        return res.status(200).send({success: true});
    }

    renderGrill(req, res, next) {
        try {
            return res.render('app', this.grillData)
        } catch (error) {
            return next(error);
        }
    }
    saveGrillData(req, res, next) {
        console.log('inside');
        try {
            console.log('saving grill data');
            const data = JSON.parse(req.body.data);
            this.grillData.data_string = JSON.stringify(data,  null, '\t');
            const { isValid, message } = jsonValidator(data);

            if (!isValid) {
                this.grillData.error = { message };
                return res.redirect('/');
            }

            let grillData = prepareGrillData(data.grill.grillItems.map((e, index) => ({...e, itemIndex: index+1})));
            grillData = grillData.map((e, index) => ({...e, id: index+1}));    
            let result = analyseGrillManager(data.grill.width, data.grill.height, grillData);
            // console.log('The analytical values and result is : ', result);
            let resultIds = result.map(e => e.id);

            console.log(resultIds);

            let remaning = transformRemainingData(grillData.filter(e => !(resultIds.includes(e.id))));
            console.log(remaning);
            this.grillData.data = data;
            this.grillData.dataToDisplay = result;
            this.grillData.remaining_data = remaning;
            this.grillData.error = null;
            this.grillData.data_string = JSON.stringify(data,  null, '\t');

            return res.redirect('/');
        } catch (error) {
            console.log(error)
            this.grillData.error = { message: 'Invalid Schema' };
            this.grillData.data_string = req.body.data;
            return res.redirect('/');
        }
    }
}

export default (new AppController());