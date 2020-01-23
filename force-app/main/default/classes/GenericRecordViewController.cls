public with sharing class GenericRecordViewController {
    public GenericRecordViewController() {

    }
    @AuraEnabled(cacheable=true)
    public static Object load(String recordMetadataParam)
    {
        RecordMetadata theRecordMetadata = (RecordMetadata)JSON.deserialize(recordMetadataParam, RecordMetadata.class);
        System.debug('objectApi = ' + theRecordMetadata.objectApi + ' recordId = ' + theRecordMetadata.recordId + ' templateType=' + theRecordMetadata.templateType);
        ILoader theLoader;
        Type t;
        if(theRecordMetadata.templateType == '2 section parallel'){
               t = Type.forName('TwoSectionParallelLoader'); 
               theLoader = (ILoader)t.newInstance();
        }
        return JSON.serialize(theLoader.load(theRecordMetadata));
    } 
}
