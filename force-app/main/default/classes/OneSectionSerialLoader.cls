public with sharing class OneSectionSerialLoader extends BaseLoader {
    public override Object load(RecordMetadata theRecordMetadata){
        return super.load(theRecordMetadata);
        
    }
    public override void extractFields(){
        fieldBeanMap = new Map<String, FieldBean>();
        System.debug('theUXTemplate.Metadata__c = ' + theUXTemplate.Metadata__c);
        theBeans = (List<FieldBean>)JSON.deserialize(theUXTemplate.Metadata__c, List<FieldBean>.class);
        for(FieldBean theBean : (List<FieldBean>)theBeans){
                fields += theBean.api + ',';
                fieldBeanMap.put(theBean.api,theBean);
        }
        fields = fields.removeEnd(',');
    }

}