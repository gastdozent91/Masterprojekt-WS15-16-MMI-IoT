require 'spec_helper'
describe 'iot_infrastructure' do

    context 'with defaults for all parameters' do
        it { should contain_class('iot_infrastructure') }
    end
end
