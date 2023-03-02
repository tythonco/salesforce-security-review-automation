const sfdx = require('sfdx-node');

interface Org_Info {
    alias: string;
    at: string;
    id: string;
    pw?: string;
    rt?: string;
    un: string;
    url: string;
}

export default class SF {
    orgInfo: Org_Info;

    private constructor(orgInfo: Org_Info) {
        this.orgInfo = orgInfo;
    }    

    get accessToken(): string {
        return this.orgInfo.at;
    }

    set accessToken(val: string) {
        this.orgInfo.at = val;
    }

    get alias(): string {
        return this.orgInfo.alias;
    }
    
    set alias(val: string) {
        this.orgInfo.alias = val;
    }

    get frontdoorUrl(): string {
        return this.orgInfo.url + '/secur/frontdoor.jsp?sid=' + this.orgInfo.at;
    }

    get instanceUrl(): string {
        return this.orgInfo.url;
    }

    set instanceUrl(val: string) {
        this.orgInfo.url = val;
    }

    static async retrieveOrgInfo(alias) {
        const result = await sfdx.force.org.display({
            targetusername: alias
        });
        return new SF({
            alias: result.alias,
            at: result.accessToken,
            id: result.id,
            un: result.username,
            url: result.instanceUrl
        });
    }
}