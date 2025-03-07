import clientModel from "../models/client.model.js";

export const updateClientStaging = async (req, res) => {
    try {
        const { clientId } = req.params;
        const { stagingList } = req.body;

        if (!Array.isArray(stagingList) || stagingList.length === 0) {
            return res.status(400).json({ message: 'Staging List is required and must be a non-empty array' });
        }
        if (!clientId || clientId.trim() =='') {
            return res.status(400).json({ message: 'Client ID is required' });
        }

        // Check if the client exists
        const checkClient = await clientModel.findOne({ where: { id: clientId } });
        if (!checkClient) {
            return res.status(404).json({ message: 'Client Not Found' });
        }

        // let existingStagingList = checkClient.stagingList || [];

        // const updatedStagingList = [...new Set([...existingStagingList, ...stagingList])];

        await clientModel.update(
            { stagingList: stagingList },  
            { where: { id: clientId } }  
        );

        res.status(200).json({
            message: 'Staging List Updated Successfully',
            updatedStagingList,
        });
    } catch (error) {
        console.error('Error updating staging list:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const listClientStaging = async (req, res) => {
    try {
        const { clientId } = req.params;
        if (!clientId || clientId == '') {
            return res.status(400).json({ message: 'Client ID is required' });
        }
        const checkClient = await clientModel.findOne({ where: { id: clientId } });
        if (!checkClient) {
            return res.status(404).json({ message: 'Client Not Found' });
        }
        const stagingList = checkClient.stagingList || [];
        res.status(200).json({ message: 'Staging List', stagingList });
    } catch (error) {
        console.error('Error listing staging list:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};