public with sharing abstract class BaseLoader implements ILoader{
    protected RecordMetadata theRecordMetadata;
    protected UXTemplate__mdt theUXTemplate;
    protected String fields ='';
    protected List<Object> theBeans;
    protected Sobject theRecord;
    protected Map<String, FieldBean> fieldBeanMap;
    private String templateType;

    public virtual Object load(RecordMetadata theRecordMetadata){
        this.theRecordMetadata = theRecordMetadata;
        this.readMetadata();
        this.extractFields();
        this.fetchRecord();
        this.generatePayload();

        return wrap(theBeans, theUXTemplate.Type__c);
    }

    public virtual void readMetadata(){
        theUXTemplate = [Select Metadata__c,Type__c from UXTemplate__mdt where DeveloperName=:theRecordMetadata.objectApi and isActive__c =true];
        //System.debug('theUXTemplate.Metadata__c = ' + theUXTemplate.Metadata__c);
    }

    public abstract void extractFields();

    public virtual void fetchRecord(){
       String query = 'Select ' + fields +  ' from ' + theRecordMetadata.objectApi + ' where ' + ' Id = ' + '\'' + theRecordMetadata.recordId + '\'';
       System.debug('query =  ' + query);
       theRecord = (SObject)Database.query(query); 
    }
    
    public virtual void generatePayload(){
        System.debug('Record = ' + theRecord);
        FieldBean fBean;
      
        for(String f: fieldBeanMap.keySet()){
            fBean = fieldBeanMap.get(f); 
              System.debug('fBean.type =' + fBean.type);
            if(fBean.type =='checkbox'){
                fBean.selectedVal = '' + (Boolean)theRecord.get(f);
            }else if(fBean.type =='address'){
                fBean.selectedVal = '' + (System.Address)theRecord.get(f);
            }else if(fBean.type =='Date'){
                fBean.selectedVal = '' + (Date)theRecord.get(f);
            }else{
                fBean.selectedVal = (String)theRecord.get(f);    
            }
            
        }        
    }

    private Object wrap(List<Object> theBeans, String templateType){
        return new FinalPayload(theBeans, templateType);
    }

    private class FinalPayload{
        private String templateType;
        private List<Object> theBeans;

        FinalPayload(List<Object> theBeans, String templateType){
            this.theBeans = theBeans;
            this.templateType = templateType;
        }
    }

}