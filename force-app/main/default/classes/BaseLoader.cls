public with sharing abstract class BaseLoader implements ILoader{
    protected RecordMetadata theRecordMetadata;
    protected UXTemplate__mdt theUXTemplate;
    protected String fields ='';
    protected List<Object> theBeans;
    protected Sobject theRecord;
    protected Map<String, FieldBean> fieldBeanMap;

    public virtual Object load(RecordMetadata theRecordMetadata){
        this.theRecordMetadata = theRecordMetadata;
        this.readMetadata();
        this.extractFields();
        this.fetchRecord();
        this.generatePayload();

        return theBeans;
    }

    public virtual void readMetadata(){
        theUXTemplate = [Select Metadata__c from UXTemplate__mdt where DeveloperName=:theRecordMetadata.objectApi and Type__c =:theRecordMetadata.templateType];
        //System.debug('theUXTemplate.Metadata__c = ' + theUXTemplate.Metadata__c);
    }

    public abstract void extractFields();

    public virtual void fetchRecord(){
       String query = 'Select ' + fields +  ' from ' + theRecordMetadata.objectApi + ' where ' + ' Id = ' + '\'' + theRecordMetadata.recordId + '\'';
       System.debug('query =  ' + query);
       theRecord = (SObject)Database.query(query); 
    }


    public abstract void generatePayload();

}
