public with sharing class GenericRecordViewController {
    public GenericRecordViewController() {

    }
    @AuraEnabled(cacheable=true)
    public static Object load(String recordMetadataParam)
    {
        RecordMetadata theRecordMetadata = (RecordMetadata)JSON.deserialize(recordMetadataParam, RecordMetadata.class);
        System.debug('objectApi = ' + theRecordMetadata.objectApi + ' recordId = ' + theRecordMetadata.recordId + ' templateType=' + theRecordMetadata.templateType);
        String templateType = getTemplateType(theRecordMetadata.objectApi);
        ILoader theLoader;
        if(templateType == '2 section parallel'){
               theLoader = (ILoader)(Type.forName('TwoSectionParallelLoader').newInstance());
        }else if(templateType == '1 section serial'){
               theLoader = (ILoader)(Type.forName('OneSectionSerialLoader').newInstance());
        }
        return JSON.serialize(theLoader.load(theRecordMetadata));
    } 

    public static String  getTemplateType(String objectApi){
        return [Select Metadata__c, Type__c from UXTemplate__mdt where DeveloperName=:objectApi and isActive__c =true LIMIT 1][0].Type__c;
    }
}