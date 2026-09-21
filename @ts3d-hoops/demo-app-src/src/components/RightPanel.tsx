import LayerTreePanel from './LayerTreePanel';
import SheetListPanel from './SheetListPanel';
import ViewTreePanel from './ViewTreePanel';
import CadConfigurationListPanel from './CadConfigurationListPanel';
import PropertiesView from './properties-view';
import { useSelector } from '@xstate/react';
import { uiActor } from '../statemachines/uiMachine';
import { viewerActor } from '../statemachines/viewerMachine';
import { core, WebViewer } from '@ts3d-hoops/web-viewer';
import { getRegisteredViewer } from '../utils/registerViewer';
import TypesTreePanel from './TypesTreePanel';
import { HoopsBcfPanel } from '@ts3d-hoops/web-viewer-components-react';

export default function RightPanel() {
  const uiState = useSelector(uiActor, (snapshot) => snapshot.context);
  const viewerState = useSelector(viewerActor, (snapshot) => snapshot.context);

  const viewer = viewerState.modelReady ? getRegisteredViewer('') : null;
  const webViewer: WebViewer | null = viewer?.hwv ?? null;
  const model: core.IModel | undefined = webViewer?.model;

  return (
    <div slot="panel-right" data-testid="panel-right" hidden={!uiState.rightPanelShown}>
      <LayerTreePanel />
      <SheetListPanel />
      <ViewTreePanel />
      <TypesTreePanel />
      <CadConfigurationListPanel />
      <div hidden={!uiState.propertyPanelShown}>
        <PropertiesView model={model} nodeId={viewerState.selectedNodeId} />
      </div>
      <div
        className="right-panel-up properties-view"
        hidden={!uiState.bcfPanelShown}
        data-testid="bcf-panel"
      >
        <HoopsBcfPanel />
      </div>
    </div>
  );
}
