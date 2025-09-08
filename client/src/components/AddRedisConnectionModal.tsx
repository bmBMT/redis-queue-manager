'use client'

import { PlusOutlined } from "@ant-design/icons";
import { trpc } from "@//config/trpc/trpc";
import useForm from "@//shared/hooks/useForm";
import { Button, Flex, Form, Input, InputNumber, Modal } from "antd";
import { Database } from "lucide-react";
import { Fragment } from "react";
import { useBoolean, useDebounceValue } from "usehooks-ts";
import { RedisAddConnectionDto, RedisAddConnectionDtoType } from '@redis-queue-manager/zod/schemas/dto/add-new-conneciton.dto';

const AddRedisConnectionModal = () => {
  const { value: modalState, setFalse: closeModal, setTrue: openModal } = useBoolean();
  const trpcUtils = trpc.useUtils();
  const { mutate: addConnection, isPending: isConnectionAdding } = trpc.redis.addNewConnection.useMutation({
    onSuccess: () => {
      trpcUtils.redis.getAllConnections.invalidate();
      closeModal();
    },
  });
  const [findName, debounceFindName] = useDebounceValue("", 300);
  const [connectionHost, debounceHost] = useDebounceValue("", 300);
  const [connectionPort, debouncePort] = useDebounceValue<undefined | number>(undefined, 300);
  const {
    isError: nameIsExist,
    isSuccess: nameIsFree,
    isFetching: isFreeNameChecking,
    error: nameCheckError,
  } = trpc.redis.checkNameIsFree.useQuery({ name: findName }, { enabled: !!findName, retry: false });
  const {
    isError: connectionDataIsExist,
    isSuccess: connectionDataIsFree,
    isFetching: isFreeConnectionDataChecking,
    error: connectionDataCheckError,
  } = trpc.redis.checkConnectionDataIsFree.useQuery(
    { host: connectionHost, port: connectionPort! },
    {
      enabled: !!connectionHost && !!connectionPort,
      retry: false,
    }
  );
  const {
    mutate: testConnection,
    isPending: isTestingConnection,
    isError: isConnectionError,
    isSuccess: isTestConnectionSuccess,
    reset: resetTestConnectionError,
  } = trpc.redis.testConnection.useMutation();

  const { formField, inputField, getValues } = useForm({
    schema: RedisAddConnectionDto,
    onSubmit: addConnection,
  });

  const checkTestConnection = () => {
    const formValues = getValues();

    testConnection(formValues);
  };

  const onClose = () => {
    resetTestConnectionError();
    formField.form.resetFields();
    debounceFindName("");
    debounceHost("");
    debouncePort(undefined);
    closeModal();
  };

  return (
    <Fragment>
      <Button icon={<PlusOutlined />} type="primary" onClick={openModal}>
        Add Redis Connection
      </Button>
      <Modal
        title="Add Redis Connection"
        centered
        open={modalState}
        onOk={formField.form.submit}
        confirmLoading={isConnectionAdding}
        onCancel={onClose}
        okText="Add"
        okButtonProps={{
          disabled: !nameIsFree || !connectionDataIsFree,
        }}
      >
        <Form style={{ maxWidth: 600 }} autoComplete="off" layout="vertical" {...formField}>
          <Form.Item<RedisAddConnectionDtoType>
            layout="vertical"
            label="Connection Name"
            required
            name="name"
            hasFeedback={nameIsExist || nameIsFree || isFreeNameChecking}
            validateStatus={nameIsExist ? "error" : nameIsFree ? "success" : "validating"}
            tooltip={nameCheckError?.message}
            {...inputField}
          >
            <Input placeholder="Producion Redis" onChange={e => debounceFindName(e.target.value)} />
          </Form.Item>
          <Flex gap={16}>
            <Form.Item<RedisAddConnectionDtoType>
              className="w-full"
              layout="vertical"
              label="Host"
              required
              name="host"
              hasFeedback={connectionDataIsExist || connectionDataIsFree || isFreeConnectionDataChecking}
              validateStatus={connectionDataIsExist ? "error" : connectionDataIsFree ? "success" : "validating"}
              tooltip={connectionDataCheckError?.message}
              {...inputField}
            >
              <Input placeholder="localhost" disabled={!nameIsFree} onChange={e => debounceHost(e.target.value)} />
            </Form.Item>
            <Form.Item<RedisAddConnectionDtoType>
              layout="vertical"
              label="Port"
              required
              name="port"
              hasFeedback={connectionDataIsExist || connectionDataIsFree || isFreeConnectionDataChecking}
              validateStatus={connectionDataIsExist ? "error" : connectionDataIsFree ? "success" : "validating"}
              tooltip={connectionDataCheckError?.message}
              {...inputField}
            >
              <InputNumber
                className="w-full"
                min={1}
                placeholder="6379"
                disabled={!nameIsFree}
                onChange={value => debouncePort(value as number)}
              />
            </Form.Item>
          </Flex>
          <Flex gap={16}>
            <Form.Item<RedisAddConnectionDtoType> layout="vertical" label="DB index" required name="db" {...inputField}>
              <InputNumber
                className="w-full"
                min={1}
                max={16}
                placeholder="0"
                disabled={!nameIsFree || !connectionDataIsFree}
              />
            </Form.Item>
            <Form.Item<RedisAddConnectionDtoType>
              className="w-full"
              layout="vertical"
              label="Password"
              name="password"
              {...inputField}
            >
              <Input.Password placeholder="••••••••" disabled={!nameIsFree || !connectionDataIsFree} />
            </Form.Item>
          </Flex>
          <Button
            className="w-full"
            icon={<Database size={14} />}
            loading={isTestingConnection}
            onClick={checkTestConnection}
            disabled={!nameIsFree || !connectionDataIsFree}
            variant='outlined'
            color={isTestConnectionSuccess ? "green" : isConnectionError ? "danger" : "default"}
          >
            Test Connection
          </Button>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default AddRedisConnectionModal;
