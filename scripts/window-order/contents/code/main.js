const EWW_NAME = "eww-dashboard";
var ewwClient = undefined;

function onWorkspaceClientAdded(client) {
  if (client.resourceName == EWW_NAME) {
    ewwClient = client;
    workspace.activeClient = ewwClient;
  }
}

function onWorkspaceClientRemoved(client) {
  if (client.resourceName == EWW_NAME) {
    ewwClient = undefined;
  }
}

function onWorkspaceClientActivated(c) {
  if (ewwClient != undefined) {
    workspace.activeClient = ewwClient;
  }
}

workspace.clientAdded.connect(onWorkspaceClientAdded);
workspace.clientRemoved.connect(onWorkspaceClientRemoved);
workspace.clientActivated.connect(onWorkspaceClientActivated);
