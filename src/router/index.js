import Vue from 'vue'
import Router from 'vue-router'
import CloudHome from '@/page/CloudHome'

import dataCollectionQ from '@/components/dataCollection/dataCollectionQ'
import Qdetail from '@/components/dataCollection/Qdetail'
import etlList from '@/components/dataCollection/etlList'
import etlCollection from '@/components/dataCollection/etlCollection'

import dataOverview from '@/components/dataWarehouse/dataOverview'
import dataManagement from '@/components/dataWarehouse/dataManagement'
import maindata from '@/components/dataWarehouse/maindata'
import metadata from '@/components/dataWarehouse/metadata'
import lifeCycle from '@/components/dataWarehouse/lifeCycle'
import hiveMaker from '@/components/dataWarehouse/hiveMaker'
import hiveModel from '@/components/dataWarehouse/hiveModel'
import hiveManagement from '@/components/dataWarehouse/hiveManagement'
import hiveTables from "@/components/dataWarehouse/hiveTables"

import overViewAnalysis from '@/components/dataProcessing/overviewAnalysis'
import structuredDataPreprocessing from '@/components/dataProcessing/structuredDataPreprocessing'
import proTaskboard from '@/components/dataProcessing/proTaskboard'
import unstructuredDataPreprocessing from '@/components/dataProcessing/unstructuredDataPreprocessing'
import textmodelList from '@/components/dataProcessing/modelList'
import seeModel from  '@/components/dataProcessing/seeModel'
import taskList from '@/components/dataProcessing/taskList'
import dataCleaning from '@/components/dataProcessing/dataCleaning'
import dataChange from '@/components/dataProcessing/dataChange'
import statisticProcessing from '@/components/dataProcessing/statisticProcessing'
import dataAppend from '@/components/dataProcessing/dataAppend'

import OLAPModeling from '@/components/analyticalModeling/OLAPModeling'
import exploratoryAnalysis from '@/components/analyticalModeling/exploratoryAnalysis'
import exploratoryAnalysisOld from '@/components/analyticalModeling/exploratoryAnalysisOld'
import exploratoryAnalysisNew from '@/components/analyticalModeling/exploratoryAnalysisNew'
import dataChoose from '@/components//analyticalModeling/dataChoose'

import serviceGeneration from '@/components//dataService/serviceGeneration'
import serviceRelease from '@/components/dataService/serviceRelease'
import apiManagement from '@/components/dataService/apiManagement'

import Definition from '@/components/dataApplication/Kgraph/Definition'
import DefinitionTable from '@/components/dataApplication/Kgraph/DefinitionTable'
import SubDefinition from '@/components/dataApplication/Kgraph/SubDefinition'
import SubDefinitionTable from '@/components/dataApplication/Kgraph/SubDefinitionTable'
import Maker from '@/components/dataApplication/Kgraph/Maker'
import Collection from '@/components/dataApplication/Kgraph/Collection'
import Example from '@/components/dataApplication/Kgraph/Example'

import dataUpload1 from '@/components/dataApplication/dataUpload1'
import datashow from '@/components/dataApplication/datashow'
import createMod from '@/components/dataApplication/createMod'
import modal0 from '@/components/dataApplication/modals/modal_0'
import preView from '@/components/dataApplication/preView'
import preview1 from '@/components/dataApplication/preview1'
import preview2 from '@/components/dataApplication/preview2'
import preview3 from '@/components/dataApplication/preView3'
import preview4 from '@/components/dataApplication/preview4'
import preview5 from '@/components/dataApplication/preview5'
import preview6 from '@/components/dataApplication/preview6'
import dataReport from '@/components/dataApplication/dataReport'
import dataUpload2 from '@/components/dataApplication/dataUpload2'
import largeScreen from '@/components/dataApplication/largeScreen'
import reportGeneration from '@/components/dataApplication/reportGeneration'
import Cockpit from '@/components/dataApplication/Cockpit'
import Cockpit1 from '@/components/dataApplication/Cockpit1'
import Cockpit2 from '@/components/dataApplication/Cockpit2'
import saveGraph from '@/components/dataApplication/cockpitAll'
import Story from '@/components/dataApplication/Story'
import storyList from '@/components/dataApplication/storyList'
import showStory from '@/components/dataApplication/showStory'
import beijing from '@/components/dataApplication/beijing'

import workingSpace from '@/components/machineLearning/workingSpace'
import missionList from '@/components/machineLearning/missionList'
import resultList from '@/components/machineLearning/resultList'
import modelList from '@/components/machineLearning/modelList'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'CloudHome',
    component: CloudHome,
    children: [
      {
        path: '/dataCollection/etlList',
        name: 'etlList',
        component: etlList,
      },
      {
        path: '/dataCollection/etlCollection',
        name: 'etlCollection',
        component: etlCollection,
      },
      {
        path: '/dataCollection/dataCollectionQ',
        name: 'dataCollectionQ',
        component: dataCollectionQ,
      },
      {
        path: '/dataCollection/Qdetail',
        name: 'Qdetail',
        component: Qdetail,
      },
      {
        path: '/dataWarehouse/dataOverview',
        name: 'dataOverview',
        component: dataOverview,
      },
      {
        path: '/dataWarehouse/dataManagement',
        name: 'dataManagement',
        component: dataManagement,
      },
      {
        path: '/dataWarehouse/maindata',
        name: 'maindata',
        component: maindata,
      },
      {
        path: '/dataWarehouse/metadata',
        name: 'metadata',
        component: metadata,
      },
      {
        path: '/dataWarehouse/lifeCycle',
        name: 'lifeCycle',
        component: lifeCycle,
      },
      {
        path: '/dataWarehouse/hiveMaker',
        name: 'hiveMaker',
        component: hiveMaker,
      },
      {
        path: '/dataWarehouse/hiveModel',
        name: 'hiveModel',
        component: hiveModel,
      },
      {
        path: '/dataWarehouse/hiveManagement',
        name: 'hiveManagement',
        component: hiveManagement,
      },
      {
        path: '/dataWarehouse/hiveTables',
        name: 'hiveTables',
        component: hiveTables,
      },
      {
        path: '/dataProcessing/overViewAnalysis',
        name: 'overViewAnalysis',
        component: overViewAnalysis,
      },
      {
        path: '/dataProcessing/structuredDataPreprocessing',
        name: 'structuredDataPreprocessing',
        component: structuredDataPreprocessing,
      },
      {
        path: '/dataProcessing/proTaskboard',
        name: 'proTaskboard',
        component: proTaskboard,
      },
      {
        path: '/dataProcessing/dataCleaning',
        name: 'dataCleaning',
        component: dataCleaning,
      },
      {
        path: '/dataProcessing/dataChange',
        name: 'dataChange',
        component: dataChange,
      },
      {
        path: '/dataProcessing/statisticProcessing',
        name: 'statisticProcessing',
        component: statisticProcessing,
      },
      {
        path: '/dataProcessing/dataAppend',
        name: 'dataAppend',
        component: dataAppend,
      },
      {
        path: '/dataProcessing/unstructuredDataPreprocessing',
        name: 'unstructuredDataPreprocessing',
        component: unstructuredDataPreprocessing,
      },
      {
        path: '/dataProcessing/modelList',
        name: 'textmodelList',
        component: textmodelList,
      },
      {
        path: '/dataProcessing/seeModel',
        name: 'seeModel',
        component: seeModel,
      },
      {
        path: '/dataProcessing/taskList',
        name: 'taskList',
        component: taskList,
      },
      {
        path: '/analyticalModeling/OLAPModeling',
        name: 'OLAPModeling',
        component: OLAPModeling,
      },
      {
        path: '/analyticalModeling/dataChoose',
        name: 'dataChoose',
        component: dataChoose,
      },
      {
        path: '/analyticalModeling/exploratoryAnalysis',
        name: 'exploratoryAnalysis',
        component: exploratoryAnalysis,
      },
      {
        path: '/analyticalModeling/exploratoryAnalysisOld',
        name: 'exploratoryAnalysisOld',
        component: exploratoryAnalysisOld,
      },
      {
        path: '/analyticalModeling/exploratoryAnalysisNew',
        name: 'exploratoryAnalysisNew',
        component: exploratoryAnalysisNew,
      },
      {
        path: '/dataService/serviceGeneration',
        name: 'serviceGeneration',
        component: serviceGeneration,
      },
      {
        path: '/dataService/serviceRelease',
        name: 'serviceRelease',
        component: serviceRelease,
      },
      {
        path: '/dataService/apiManagement',
        name: 'apiManagement',
        component: apiManagement,
      },
      {
        path: '/dataApplication/Definition',
        name: 'Definition',
        component: Definition,
      },
      {
        path: '/dataApplication/DefinitionTable',
        name: 'DefinitionTable',
        component: DefinitionTable,
      },
      {
        path: '/dataApplication/SubDefinition',
        name: 'SubDefinition',
        component: SubDefinition,
      },
      {
        path: '/dataApplication/SubDefinitionTable',
        name: 'SubDefinitionTable',
        component: SubDefinitionTable,
      },
      {
        path: '/dataApplication/Maker',
        name: 'Maker',
        component: Maker,
      },
      {
        path: '/dataApplication/Collection',
        name: 'Collection',
        component: Collection,
      },
      {
        path: '/dataApplication/Example',
        name: 'Example',
        component: Example,
      },
      {
        path: '/dataApplication/dataUpload1',
        name: 'dataUpload1',
        component: dataUpload1
      },
      {
        path: '/dataApplication/datashow',
        name: 'datashow',
        component: datashow
      },
      {
        path: '/dataApplication/createMod',
        name: 'createMod',
        component: createMod,
      },
      {
        path: '/dataApplication/modal0',
        name: 'modal0',
        component: modal0
      },
      {
        path: '/dataApplication/dataReport',
        name: 'dataReport',
        component: dataReport
      },
      {
        path: '/dataApplication/largeScreen',
        name: 'largeScreen',
        component: largeScreen,
      },
      {
        path: '/dataApplication/dataUpload2',
        name: 'dataUpload2',
        component: dataUpload2
      },
      {
        path: '/dataApplication/reportGeneration',
        name: 'reportGeneration',
        component: reportGeneration,
      },
      {
        path: '/dataApplication/Cockpit',
        name: 'Cockpit',
        component: Cockpit,
      },
      {
        path: '/dataApplication/Cockpit1',
        name: 'Cockpit1',
        component: Cockpit1,
      },
      {
        path: '/dataApplication/Cockpit2',
        name: 'Cockpit2',
        component: Cockpit2,
      },
      {
        path: '/dataApplication/beijing',
        name: 'beijing',
        component: beijing,
      },
      {
        path: '/dataApplication/saveGraph',
        name: 'saveGraph',
        component: saveGraph,
      },
      {
        path: '/dataApplication/Story',
        name: 'Story',
        component: Story,
      },
      {
        path: '/dataApplication/storyList',
        name: 'storyList',
        component: storyList,
      },
      {
        path: '/dataApplication/showStory',
        name: 'showStory',
        component: showStory,
      },
      {
        path: '/machineLearning/workingSpace',
        name: 'workingSpace',
        component: workingSpace
      },
      {
        path: '/machineLearning/modelList',
        name: 'modelList',
        component: modelList
      },
      {
        path: '/machineLearning/resultList',
        name: 'resultList',
        component: resultList
      },
      {
        path: '/machineLearning/missionList',
        name: 'missionList',
        component: missionList
      }
    ]
  },
  {
    path: '/dataApplication/preView',
    name: 'preView',
    component: preView
  },
  {
    path: '/dataApplication/preview1',
    name: 'preview1',
    component: preview1
  },
  {
    path: '/dataApplication/preview2',
    name: 'preview2',
    component: preview2
  },
  {
    path: '/dataApplication/preview3',
    name: 'preview3',
    component: preview3
  },
  {
    path: '/dataApplication/preview4',
    name: 'preview4',
    component: preview4
  },
  {
    path: '/dataApplication/preview5',
    name: 'preview5',
    component: preview5
  },{
    path: '/dataApplication/preview6',
    name: 'preview6',
    component: preview6
  }]
})
