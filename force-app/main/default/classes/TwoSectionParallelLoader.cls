public with sharing class TwoSectionParallelLoader extends BaseLoader{
    
    public override Object load(RecordMetadata theRecordMetadata){
        return super.load(theRecordMetadata);
        
    }

    

    public override void extractFields(){
        fieldBeanMap = new Map<String, FieldBean>();
        theBeans = (List<SectionMetadataBean>)JSON.deserialize(theUXTemplate.Metadata__c, List<SectionMetadataBean>.class);
        for(SectionMetadataBean theBean : (List<SectionMetadataBean>)theBeans){
            for(FieldBean f : theBean.fields){
                fields += f.api + ',';
                fieldBeanMap.put(f.api,f);

            }
        }
        fields = fields.removeEnd(',');
    }

    public class SectionMetadataBean{
        public String sectionName;
        public String sectionTemplate;
        public String sectionOrder;
        public String position;
        public List<FieldBean> fields;
    }
}